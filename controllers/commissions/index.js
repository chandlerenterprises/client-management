var express = require('express');
var router = express.Router();

/*
 
 UNASSINGED CONTROLLER

*/

router.get('/', function(req, res) {
    res.render('dev')
})

router.get('/createJam', function(req, res) {
  require('./createJam')(req, res)
});

router.post('/acceptInvite', function(req, res) {
  //require('./')(req, res)
});



module.exports = router;