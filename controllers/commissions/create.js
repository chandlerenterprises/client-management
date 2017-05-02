var moment = require('momentum')

var errorHandler = require(global.base+'/middleware/errorHandler')
var Client = require('../models/client')
var Commission = require('../models/commission')

module.exports = function(req, res) {
  
  //client
  //token
  //title
  //desc
  //suggested payment
  
  if (req.body.desc.length > 500) return res.error('Please provide a shorter description')
  
  Client.findOne({ _id : req.body.client }, function(err, client) {
    if (err) return errorHandler.mongo(err)
    
    if (!client) return res.error('This client doesnt exist on zoht!')
    
    Commission.create(req.body, function(err, client) { // change to individual keys
      if (err) return errorHandler.mongo(err)
      res.success()
    })
    
  })
  
}