var moment = require('moment')
var errorHandler = require(global.base+'/middleware/errorHandler')

module.exports = function(req, res) {
  var body = req.body
  console.log(body)
  //var due = moment(body.due),
  //if(!due.isValid()) return res.error('please enter a valid due date')
  if(body.desc > 200) return res.error('cant be greater than 200 ...') //implement bulleted list system
    console.log('got here1')
  
  global.models.commission.findOne({ _id : body._id }, function(err, commission) {
    if(err) return errorHandler.mongo(err)
    console.log('got here2')

    if(!commission) return res.error('this commission doesnt exist!')
    if(body.partition > commission.payment) return res.error('the deliverable partition cant be greater than the total price of a commission')

    var deliverable = {
      dates : {
        created : moment(),
        start : body.dates.start,
        due : body.dates.due,
        completed : false
      },
      title : body.title,
      partition : body.partition,
      desc : body.desc,
      claimable : body.claimable,
      devs : [],
      notes : [],
      commission : body._id
    }
    
    global.models.deliverable.create(deliverable, function(err, results) {
      if(err) return errorHandler.mongo(err)
      commission.deliverables.push(results._id)
      commission.save(), res.success(false, { results : results })
    })    
  })
  
}