var express = require('express');
var router = express.Router();
var errorHandler = require(global.base+'/middleware/errorHandler')

/*
 
 COMMISSION CONTROLLER

*/

router.get('/load/:id', function(req, res) {
  global.models.commission.findOne({ _id : req.params.id }).populate({
    path : 'creator deliverables'
  }).exec(function(err, commission) {
    if(err || !commission) return res.error('this commission doesnt exist');
    console.log(commission)
    res.render('commission', commission)
  })
})

router.get('/new', function(req, res) {
  if(res.locals.userType === 'client') return res.redirect('/auth')
  require('../../resources/load')(req, res, 'clients', 'devs', function(err, results) {
    if(!err) {
      res.render('newCommission', {
        clients : parse(res, results.clients),
        devs : parse(res, results.devs)
      })
    }
  })
})

router.get('/request', function(req, res) {
  require('./request')(req, res)
})

router.post('/accept', function(req, res) {
  require('./accept')(req, res)
})

router.post('/create', function(req, res) {
  require('./create')(req, res)
})

module.exports = router;

function parse(res, userDocs) {
  var parsed = []

  if(userDocs && userDocs[0]) {
    for(var a in userDocs) {
      var userId = userDocs[a]._id;
      if(userId == res.locals.userId) continue;
      parsed.push({
        _id: userDocs[a]._id,
        email: userDocs[a].email
      })
    }
  }
  return parsed
}