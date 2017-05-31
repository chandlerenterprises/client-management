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
      $('.newDeliverable').hide()
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
        $('.newDeliverable').show()
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

  $('#newCommission button').click(function() {
    $.ajax({
      type : 'POST',
      url : 'https://ethanchandler.com/commission/create',
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

  var newDeliverableActive;

  $('.newDeliverable, .saveDeliverable, .deleteNewDeliverable').click(function() {
    if(!newDeliverableActive) {
      $('.newDeliverable').hide()
      $('.saveDeliverable').show()
      $('.deleteNewDeliverable').show()
      $('#deliverables .deliverable.new').show()

      newDeliverableActive = true;
    } else {
      //ajax call right here
      $('.newDeliverable').show()
      $('.saveDeliverable').hide()
      $('.deleteNewDeliverable').hide()

      $('#deliverables .deliverable.new').hide()

      newDeliverableActive = false
    }
  })

  $('.saveDeliverable').click(function() {
    var dates = {
      start: $('#checkin').datepicker('getDate') / 1000,
      due: $('#checkout').datepicker('getDate') / 1000
    }
    
    $.ajax({
      type : 'POST',
      url : 'https://ethanchandler.com/deliverable/new',
      data : JSON.stringify({
        dates : dates,
        title : $('.deliverable.new input.title').val(),
        partition : $('.deliverable.new input.partition').val(),
        desc : $('.deliverable.new textarea').val(),
        claimable : false,
        _id : $('.commissionId').data('id')
      }),
      contentType: "application/json; charset=UTF-8",
      success: function(res) {
        console.log(res)
        var results = res.data.results;
        if(res.success) $('#deliverables .container').append(
          '<div class="deliverable inactive" data-id='+results._id+'>'+
            '<h3> title: '+ results.title +'</h3>'+
            '<h3> title: '+ results.dates.start +'</h3>'+
            '<h3> title: '+ results.dates.due +'</h3>'+
            '<h3> title: '+ results.desc +'</h3>'+
            '<div class="deleteDeliverable">'+
            '<i class="btb bt-trash"></i>'+
            '</div>'+
          '</div>'
        )
      }
    });
  })
  
  $(document).on('click', '.deleteDeliverable', function() {
    var deliverable = $(this).parent()
    $.ajax({
      type : 'POST',
      url : 'https://ethanchandler.com/deliverable/delete',
      data : JSON.stringify({
        deliverable_id : deliverable.data('id'),
        commission_id : $('.commissionId').data('id')
      }),
      contentType: "application/json; charset=UTF-8",
      success: function(res) {
        if(res.success) deliverable.remove()

      }
    });
  })

  $("#checkin").datepicker({
    dateFormat: 'dd-mm-yy',
  });

  $("#checkout").datepicker({
    dateFormat: 'dd-mm-yy',
  });
})

