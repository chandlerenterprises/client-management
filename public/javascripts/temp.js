/*global $ io Cookies*/

Date.parseDate = function( input, format ){
  return moment(input,format).toDate();
};
Date.prototype.dateFormat = function( format ){
  return moment(this).format(format);
};


$(document).ready(function() {

	$(".meter > span").each(function() {
		$(this)
			.data("origWidth", $(this).width())
			.width(0)
			.animate({
				width: $(this).data("origWidth")
			}, 1200);
	});
	
	var searchActive;
	
	$('#search input').focus(function() {

    if(!searchActive) {
      $('#newDeliverable').hide()
      $('#search').animate({'width' : '100%'}, 'slow', false, function() {
        $('#search .close').show()
        $('#search i.bt-search').addClass('hatch')
        setTimeout(function() {
          searchActive = true;
        }, 800)        
      })
    }

	})
	
	$('#search input').focusout(function() {
    closeSearch();
	})
	
	$('#search .close').click(function() {
	  console.log('test')
    closeSearch();
	})
	
  function closeSearch() {
    if(searchActive) {
      $('#search .close').hide()
      $('#search').animate({'width' : '40%'}, 'slow', false, function() {
        $('#newDeliverable').show()
        $('#search i.bt-search').removeClass('hatch')
        setTimeout(function() {
          searchActive = false;
        }, 800)
      })
    }
  }
	
	$('#search').on('input', function() {
	  console.log('test')
	})

  var clients = [], devs = []

  $('#clients h3').click(function() {
    $(this).css('color', 'red')
    clients.push($(this).data('id'))
  })
  
  $('#devs h3').click(function() {
    $(this).css('color', 'red')
    devs.push($(this).data('id'))
  })

  $('#newDeliverablePage button').click(function() {
    console.log($('.commissionId').data('id'))
    $.ajax({
      type : 'POST',
      url : 'https://ethanchandler.com/deliverable/add',
      data : JSON.stringify({
        dates : {
          start: $('#newDeliverablePage input.startDate').val(),
          due: $('#newDeliverablePage input.dueDate').val()
        },
        partition : $('#newDeliverablePage input.partition').val(),
        desc : $('#newDeliverablePage input.desc').val(),
        _id : $('.commissionId').data('id')
      }),
      contentType: "application/json; charset=UTF-8",
      success: function(res) {
        console.log(res)
        if(res.success) window.location.replace('/commission/load/'+res.data._id)
        
      }
    });
  })

  $('#newCommission button').click(function() {
    $.ajax({
      type : 'POST',
      url : 'https://ethanchandler.com/commission/add',
      data : JSON.stringify({
        clients : clients,
        devs : devs,
        title : $('#newCommission input.title').val(),
        payment : $('#newCommission input.payment').val(),
        desc : $('#newCommission input.desc').val()
      }),
      contentType: "application/json; charset=UTF-8",
      success: function(res) {
        console.log(res)
        if(res.success) window.location.replace('/commission/'+res.data._id)
        
      }
    });
  })

  $('#newDeliverablePage .close').click(function() {
    $('#deliverables #content').show()
    $('#deliverables #controller').show()

    $('#newDeliverablePage').hide()
  })

  var newDeliverableActive;

  $('#newDeliverable, #saveDeliverable').click(function() {
    if(!newDeliverableActive) {
      $('#deliverables .container').append("<div class='deliverable'></div>")
      $('#newDeliverable').hide()
      $('#saveDeliverable').show()
      newDeliverableActive = true;
    } else {
      console.log('hit')
      //ajax call right here
      $('#newDeliverable').show()
      $('#saveDeliverable').hide()

      newDeliverableActive = false
    }
  })

  $('#checkin').datetimepicker({
    onShow: function(ct){
      this.setOptions({
        minDate: new Date()
      });
    },
    format: 'DD.MM.YYYY',
    formatDate: 'DD.MM.YYYY',
    datepicker: true,
    timepicker: false
  });

  $('#checkout').datetimepicker({
    onShow: function(ct){
      this.setOptions({
        minDate: $('#checkin').val() ? $('#checkin').val() : new Date()
      });
    },
    format: 'DD.MM.YYYY',
    formatDate: 'DD.MM.YYYY',
    datepicker: true,
    timepicker: false
  });

  
})

