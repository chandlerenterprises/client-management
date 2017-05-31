var moment = require('moment')
var errorHandler = require(global.base+'/middleware/errorHandler')

module.exports = function(req, res) {
  var body = req.body, deliverableId = body.deliverable_id;
  
  global.models.commission.findOne({ _id : body.commission_id }, function(err, commission) {
    if(err) return errorHandler.mongo(err)
    if(!commission) return res.error('this commission doesnt exist!')
    
    var matchesCommission, idx;
    for(var a in commission.deliverables) {
      if(commission.deliverables[a] == deliverableId) matchesCommission = true, idx = a;
    }
    
    if(!matchesCommission) return res.error('this deliverable does not belong to this commission')
    
    global.models.deliverable.findOne({ _id : deliverableId }, function(err, deliverable) {
      if(err) return errorHandler.mongo(err)
      if(deliverable) deliverable.remove()
      commission.deliverables.splice(idx, 1)
      
      //alert devs that are working on deliverable
      
      deliverable.save(), commission.save(), res.success()
      
    })    
  })
  
}