var Bcrypt = require('bcryptjs');

var errorHandler = require(global.base+'/middleware/errorHandler')
var User = require(global.base+'/models/user')

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

      res.redirect('/home')
    });
  });
  
}