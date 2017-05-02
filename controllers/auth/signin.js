var Bcrypt = require('bcryptjs')
var moment = require('moment')
var JWT = require('jwt-simple')

var errorHandler = require(global.base+'/middleware/errorHandler')
var User = require(global.base+'/models/user')
var authentication = require(global.base+'/config/authentication.json')

module.exports = function(req, res) {
  var username = req.body.username.toLowerCase()

  User.findOne({ username : username }, function(err, user) {
    if (err) return errorHandler.mongo(err)

    if (!user) return res.error('This account doesnt exist')
    if (!Bcrypt.compareSync(req.body.password, user.password)) {
      return res.error('incorrect password')
    }

    user.update({ lat : req.body.lat, lon : req.body.lon }, function(err, results) {
      if (err) return errorHandler.mongo(err)

      var expires = moment().add(2, 'hours').valueOf(), redirectURL, bounceMsg;
      var token = JWT.encode({
        serverSessionId : global.serverSessionId,
        iss : username,
        exp : expires
      }, authentication.tokenNames.main.secret)
      
      res.success('Logged in!', token)
      
    });
  });
  
}