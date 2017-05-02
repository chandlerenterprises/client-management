var validator = require('validator');
var Bcrypt = require('bcryptjs');

var errorHandler = require(global.base+'/middleware/errorHandler')
var User = require(global.base+'/models/user')

module.exports = function(req, res) {
  var email = req.body.email.toLowerCase()

  User.findOne({ email : email }, function(err, user) {
    
    if (err) return errorHandler.mongo(err)
    if (user) res.error('An client already exists with that email!')
    if (!validator.isEmail(email)) return res.error('Please enter a valid email')

    req.body.password = Bcrypt.hashSync(req.body.password, Bcrypt.genSaltSync(10))

    //parse body

    User.create(req.body, function(err, results) {
      if (err) return errorHandler.mongo(err)
      res.success()
    });
    
  });

}