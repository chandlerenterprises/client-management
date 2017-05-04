/*global $ io Cookies*/
$(document).ready(function() {
  
  var socket = io.connect('https://ethanchandler.com');
  var JWT = Cookies('JWT')

  socket.emit('store socket session', JWT);
  
  $('#signup button').click(function() {
    $.ajax({
      type : 'POST',
      url : 'https://ethanchandler.com/auth/signup/dev',
      data : JSON.stringify({
        email : 'ethan.chandler@metmail.org',
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
    $.ajax({
      type : 'POST',
      url : 'https://ethanchandler.com/auth/signin/dev',
      data : JSON.stringify({
        email : $('#signin input.email').val(),
        password : $('#signin input.password').val()
      }),
      contentType: "application/json; charset=UTF-8",
      success: function(res) {
        Cookies.remove('JWT')
        Cookies.set('JWT', res.data.token, { expires: res.data.exp, path: '/' });
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