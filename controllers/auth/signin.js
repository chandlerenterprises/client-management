var Bcrypt = require('bcryptjs')
var moment = require('moment')
var JWT = require('jwt-simple')

var errorHandler = require(global.base+'/middleware/errorHandler')
var authentication = require(global.base+'/config/auth.json')
var async = require('async')

module.exports = function(req, res) {
  var userType = req.params.userType.toLowerCase()
  var model;

  if (userType == 'dev' || userType == 'client') model = global.models[userType]
  else return res.error('invalid user type')
  
  model.findOne({ email : req.body.email.toLowerCase() }, function(err, user) {
    if (err) return errorHandler.mongo(err)
    if (!user) return res.error('This account doesnt exist')
    if (!Bcrypt.compareSync(req.body.password, user.password)) {
      return res.error('incorrect password')
    }

    var admins = authentication.adminAccounts
    var expires = moment().add(2, 'hours').valueOf()
    var token = {
      serverSessionId : global.serverSessionId,
      userId : user._id,
      userType : userType,
      email : user.email,
      name : user.name,
      exp : expires,
      admin : false,
      authenticated: false
    }
    
    for(var a in admins) {
      if(admins[a] == user.email) token.admin = true
    }
    
    token = JWT.encode(token, authentication.secretJWTKey)
    res.success('Logged in!', { token : token, exp : expires })
  });
  
}