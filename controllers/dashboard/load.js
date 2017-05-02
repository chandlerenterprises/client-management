/*global models*/
var moment = require('moment')
var errorHandler = require(global.base+'/middleware/errorHandler')

module.exports = function(req, res) {
  
  models[res.locals.userType].findOne({ _id : res.userId }).select('-password').populate({
    path : 'commissions'
  }).exec(function(err, dev) {
    
    if(err) return errorHandler.mongo(err)
    if(!dev) return res.error('unexpected error') //log user out.. something went wrong. their userId was lost along the way
    
    res.send(dev)
    
  })
  
}