var errorHandler = require(global.base+'/middleware/errorHandler')
var Dev = require('../models/dev')
var Deliverable = require('../models/deliverable')
var Commission = require('../models/commission')

module.exports = function(req, res) {
    
  Commission.findOne({ _id: req.body.commissionId }).populate({
    path : 'deliverables devs'
  }).exec(function(err, commission) {
    
    if(err) return errorHandler.mongo(err)
    if(!commission) return res.error('This commission does was not found!')
    
    var apartOfCommission, acceptedDeliverable
    for(var a in commission.devs) { //check if dev is apart of commission
      if(commission.devs[a] == req.body.userId) apartOfCommission = true;
    }
    
    if(!apartOfCommission) commission.devs.push(req.body.userId); //add a new dev ref to commission doc
    else { //if apart of commission check if they accepted the deliverable
      for(var a in commission.deliverables.devs) {
        if(commission.deliverables.devs.devs[a] == req.body.userId) {
          acceptedDeliverable = true;
        }
      }
    }
    
    if(acceptedDeliverable) return res.error('You have already accepted this deliverable!')
    else commission.deliverables.devs.push(req.body.userId) //add dev id to deliverable doc -- !(not a new ref. that's stored in commission)
    
    res.success()
    
  })

}