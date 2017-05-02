var Bcrypt = require('bcryptjs')
var moment = require('moment')
var JWT = require('jwt-simple')

var errorHandler = require(global.base+'/middleware/errorHandler')
var User = require(global.base+'/models/user')
var authentication = require(global.base+'/config/authentication.json')

module.exports = function(req, res) {

  User.findOne({ email : req.body.email.toLowerCase() }, function(err, user) {
    if (err) return errorHandler.mongo(err)

    if (!user) return res.error('This account doesnt exist')
    if (!Bcrypt.compareSync(req.body.password, user.password)) {
      return res.error('incorrect password')
    }

    var expires = moment().add(2, 'hours').valueOf(), redirectURL, bounceMsg;
    var token = JWT.encode({
      serverSessionId : global.serverSessionId,
      iss : user._id,
      exp : expires
    }, authentication.tokenNames.main.secret)
    
    res.success('Logged in!', token)

  });
  
}