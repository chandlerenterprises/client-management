/*global models*/
var moment = require('moment')
var async = require('async')
var errorHandler = require(global.base+'/middleware/errorHandler')

module.exports = function(req, res, clients, devs, cb) {
  async.parallel({
    devs : function(cb) {
      if(!devs) return cb([])
      global.models.dev.find({}).select('-password')
      .populate('commissions.created commissions.invites requests')
      .exec(cb)
    },
    clients : function(cb) {
      if(!clients) return cb([])
      global.models.client.find({}).select('-password')
      .populate('commissions.invites requests')
      .exec(cb)
    }
  }, function(err, results) {
    if(err) return errorHandler.mongo(err)
    
    cb(err, results)
  })
  
} 