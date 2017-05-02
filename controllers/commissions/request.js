var moment = require('momentum')

var errorHandler = require(global.base+'/middleware/errorHandler')
var Client = require('../models/client')
var Commission = require('../models/commission')

module.exports = function(req, res) {

  Commission.findOne({ _id : req.body.jamId }, function(err, jamSession) {
    if(err) return errorHandler.mongo(err)
    
  })
  
  
}