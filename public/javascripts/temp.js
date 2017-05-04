/*global $ io Cookies*/
$(document).ready(function() {

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
