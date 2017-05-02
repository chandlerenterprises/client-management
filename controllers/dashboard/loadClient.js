var moment = require('momentum')

var errorHandler = require(global.base+'/middleware/errorHandler')
var Client = require('../models/user')

module.exports = function(req, res) {
  
  Client.findOne({ _id : res.userId }).select('-password').populate({
    path : 'commissions'
  }).exec(function(err, dev) {
    
    if(err) return errorHandler.mongo(err)
    if(!dev) return res.error('unexpected error') //log user out.. something went wrong. their userId was lost along the way
    
    res.send(dev)
    
  })
  
}