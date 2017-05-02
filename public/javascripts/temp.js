/*global $*/
$(document).ready(function() {
  
  $('#signup button').click(function() {
    console.log('test')
    $.ajax({
      type : 'POST',
      url : 'https://ethanchandler.com/auth/signup',
      data: JSON.stringify({
        email : 'ethan.chandler@metmail.org',
        username : $('#signup input.username').val(),
        password : $('#signup input.password').val(),
        lat : '000',
        lon : '000',
        age : '17'
      }),
      contentType: "application/json; charset=UTF-8",
      success: function(res) {
        console.log(res)

      }
    });
  })

  $('#signin button').click(function() {
    console.log('test')
    $.ajax({
      type : 'POST',
      url : 'https://ethanchandler.com/auth/signin',
      data: JSON.stringify({
        username : $('#signin input.username').val(),
        password : $('#signin input.password').val(),
        lat : '000',
        lon : '000'
      }),
      contentType: "application/json; charset=UTF-8",
      success: function(res) {
        console.log(res)

      }
    });
  })

  $('#createJam button').click(function() {
    console.log('test')
    $.ajax({
      type : 'POST',
      url : 'https://ethanchandler.com/auth/signin',
      data: JSON.stringify({
        username : $('#signin input.username').val(),
        password : $('#signin input.password').val()
      }),
      contentType: "application/json; charset=UTF-8",
      success: function(res) {
        console.log(res)

      }
    });
  })

})