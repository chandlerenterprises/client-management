/*global models*/
var moment = require('moment')
var errorHandler = require(global.base+'/middleware/errorHandler')

module.exports = function(req, res, cb) {

  if(!res.locals.authenticated) return res.redirect('/auth')
  models.dev.find({}).select('-password').populate({
    path : 'commission.invites requests'
  }).exec(function(err, clients) {
    if(err) return errorHandler.mongo(err)
    cb(err, clients)
  })
  
} 