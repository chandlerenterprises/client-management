var moment = require('moment')
var errorHandler = require(global.base+'/middleware/errorHandler')

module.exports = function(req, res) {
  var body = req.body
  console.log(body)
  //var due = moment(body.due),
  //if(!due.isValid()) return res.error('please enter a valid due date')
  if(body.desc > 200) return res.error('cant be greater than 200 ...') //implement bulleted list system
  
  global.models.commission.findOne({ _id : body._id }, function(err, commission) {
    if(err) return errorHandler.mongo(err)
    if(!commission) return res.error('this commission doesnt exist!')
    if(body.partition > commission.payment) return res.error('the deliverable partition cant be greater than the total price of a commission')

    var deliverable = {
      dates : {
        created : moment(),
        due : moment().add('days', '5'), //body.due, ADD JQUERY DATE PICKER
        completed : false
      },
      partition : body.partition,
      desc : body.desc,
      claimable : body.claimable,
      devs : []
    }
    
    global.models.deliverable.create(deliverable, function(err, results) {
      if(err) return errorHandler.mongo(err)
      commission.deliverables.push(results._id)
      commission.save()
    })    
  })
  
}