var express = require('express');
var router = express.Router();

/*
 
 DELIVERABLE CONTROLLER

*/

router.post('/claim', function(req, res) {
  require('./claim')(req, res)
})

router.post('/add', function(req, res) {
  require('./add')(req, res)
})

router.post('/remove', function(req, res) {
  require('./remove')(req, res)
})



module.exports = router;