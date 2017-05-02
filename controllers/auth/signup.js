var validator = require('validator');
var Bcrypt = require('bcryptjs');

var errorHandler = require(global.base+'/middleware/errorHandler')
var User = require(global.base+'/models/user')

module.exports = function(req, res) {
  var username = req.body.username.toLowerCase(), email = req.body.email.toLowerCase()

  User.findOne({ username : username, email : email }, function(err, user) {
    if (err) return errorHandler.mongo(err)
    
    if (user) {
      if (user.username == username || user.email == email) {
        return res.error('existing account', { username : user.username, email : user.email })
      }
    }
    
    if (!validator.isAlphanumeric(username)) return res.error('Username cannot special characters')
    if (!validator.isEmail(email)) return res.error('Please enter a valid email')

    var salt = Bcrypt.genSaltSync(10);
    req.body.password = Bcrypt.hashSync(req.body.password, salt), req.body.username = username

    User.create(req.body, function(err, results) {
      if (err) return errorHandler.mongo(err)
      res.success()
    });
  });

}