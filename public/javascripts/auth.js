/*global $ io Cookies*/
$(document).ready(function() {
  
  var socket = io.connect('https://ethanchandler.com');
  var JWT = Cookies('JWT')

  socket.emit('store socket session', JWT);
  
  $('#signup button').click(function() {
    var userType = ( $('input.dev').is(':checked') ? 'dev' : 'client')

    $.ajax({
      type : 'POST',
      url : 'https://ethanchandler.com/auth/signup/'+userType,
      data : JSON.stringify({
        email : $('#signup input.email').val(),
        firstName : $('#signup input.firstName').val(),
        lastName : $('#signup input.lastName').val(),
        password : $('#signup input.password').val()
      }),
      contentType: "application/json; charset=UTF-8",
      success: function(res) {
        console.log(res)
      }
    });
  })

  $('#signin button').click(function() {
    var devChecked = $('input.dev').is(':checked'), clientChecked = $('input.client').is(':checked')
    if(!devChecked && !clientChecked) return console.log('please select a userType!')
    var userType = ( devChecked ? 'dev' : 'client')
    
    $.ajax({
      type : 'POST',
      url : 'https://ethanchandler.com/auth/signin/'+userType,
      data : JSON.stringify({
        email : $('#signin input.email').val(),
        password : $('#signin input.password').val()
      }),
      contentType: "application/json; charset=UTF-8",
      success: function(res) {
        console.log(res.data)
        Cookies.remove('JWT')
        Cookies.set('JWT', res.data.token, { expires: res.data.exp, path: '/' });
        window.location.replace('/dashboard')
      }
    })
  })
  
  $('#signout button').click(function() {
    $.ajax({
      type : 'GET',
      url : 'https://ethanchandler.com/auth/signout/',
      contentType: "application/json; charset=UTF-8",
      success: function(res) {
        socket.emit('clear socket session', JWT)
        document.cookie.split(";").forEach(function(c) { 
          document.cookie = c.replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        })
      }
    })
  })
  
})