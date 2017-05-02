var moment = require('momentum')

var errorHandler = require(global.base+'/middleware/errorHandler')
var User = require('../models/user')
var JamSession = require('../models/jamSession')

module.exports = function(req, res) {

  User
  .findOne({ username : res.locals.username })
  .populate({ path : 'jams.created jams.participating' }).exec(function(err, user) {
    if(err) return errorHandler.mongo(err);

    var userJams = user.jams.created.concat(user.jams.participating)
    for(var a in userJams) {
      var timeDifference = moment(moment()).diff(userJams[a].date);

      if(userJams[a].status == 'active') return res.error('you are currently in a jam')
      if(!userJams[a].abandoned && timeDifference >= '4hrs') { //do this right
        return res.error('You have an approaching jam within 4hrs')
      }
      
      //invite handler
      
      //you could validate sent genres & instruments
      
    }

    JamSession.create(req.body, function(err, results) {
      if(err) return errorHandler.mongo(err);
      
    })
    
  })
  
  
}