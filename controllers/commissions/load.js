/*global models*/
var moment = require('moment')
var errorHandler = require(global.base+'/middleware/errorHandler')

module.exports = function(req, res) {
  console.log(res.locals)
  
  if(!res.locals.authenticated) return res.redirect('/auth')
  models[res.locals.userType].findOne({ _id : res.locals.userId }).select('-password').populate({
    path : 'commissions.created commissions.invited'
  }).exec(function(err, userDoc) {

    if(err) return errorHandler.mongo(err)
    if(!userDoc) return res.error('unexpected error') //log user out.. something went wrong. their userId was lost along the way
    
    console.log(userDoc)
    
    res.render('dashboard', { commissions : userDoc.commissions })
    
  })
  
} 