var validator = require('validator');
var Bcrypt = require('bcryptjs');

var errorHandler = require(global.base+'/middleware/errorHandler')

module.exports = function(req, res) {
  console.log(req.body)
  var email = req.body.email.toLowerCase(), userType = req.params.userType.toLowerCase()
  var model;

  if (userType == 'dev' || userType == 'client') model = global.models[userType]
  else return res.error('invalid user type')

  if (!validator.isEmail(email)) return res.error('Please enter a valid email')

  model.findOne({ email : email }, function(err, user) {
    if (err) return errorHandler.mongo(err)
    console.log(user)
    if (user) return res.error('An '+userType+' already exists with that email!')

    model.create({
      email : email,
      name : {
        first : req.body.firstName.toLowerCase(),
        last : req.body.lastName.toLowerCase()
      },
      password : Bcrypt.hashSync(req.body.password, Bcrypt.genSaltSync(10)),
      commissions : { created : [], invites : [] }
    }, function(err, results) {
      if (err) return errorHandler.mongo(err)
      res.success()
    });
    
  });

}