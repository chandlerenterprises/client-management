var validator = require('validator');
var Bcrypt = require('bcryptjs');

var errorHandler = require(global.base+'/middleware/errorHandler')

module.exports = function(req, res) {
  var email = req.body.email.toLowerCase(), userType = req.params.userType.toLowerCase()
  
  if (!validator.isEmail(email)) return res.error('Please enter a valid email')
  if(!userType == 'dev' || !userType == 'client') return res.error('invalid user type')
  
  var model = global.models[userType]
  
  model.findOne({ email : email }, function(err, user) {
    if (err) return errorHandler.mongo(err)
    if (user) return res.error('An client already exists with that email!')

    model.create({
      email : email,
      firstName : req.body.firstName.toLowerCase(),
      lastName : req.body.lastName.toLowerCase(),
      password : Bcrypt.hashSync(req.body.password, Bcrypt.genSaltSync(10)),
    }, function(err, results) {
      if (err) return errorHandler.mongo(err)
      res.success()
    });
    
  });

}