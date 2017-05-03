/*global $ io Cookies*/
$(document).ready(function() {
  
  var socket = io.connect('https://ethanchandler.com');
  var token = sessionStorage.getItem('token') 

  socket.emit('store socket session', {});
  
  $('#signup button').click(function() {
    console.log('test')
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
      url : 'https://ethanchandler.com/auth/signin',
      data : JSON.stringify({
        username : $('#signin input.username').val(),
        password : $('#signin input.password').val(),
        lat : '000',
        lon : '000'
      }),
      contentType: "application/json; charset=UTF-8",
      success: function(res) {
        Cookies.remove('JWT')
        Cookies.set('JWT', res.token, { expires: res.exp, path: '/' });
      }
    });
  })

  $('#newCommission button').click(function() {
    console.log('test')
    $.ajax({
      type : 'POST',
      url : 'https://ethanchandler.com/commissions/new',
      data : JSON.stringify({
        clientEmail : $('#signin input.email').val(),
      }),
      contentType: "application/json; charset=UTF-8",
      success: function(res) {
        console.log(res)

      }
    });
  })

})
