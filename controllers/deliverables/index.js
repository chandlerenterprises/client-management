var express = require('express');
var router = express.Router();

/*
 
 DELIVERABLE CONTROLLER

*/

router.post('/accept', function(req, res) {
  require('./accept')(req, res)
})

router.post('/add', function(req, res) {
  require('./add')(req, res)
})

router.post('/remove', function(req, res) {
  require('./remove')(req, res)
})



module.exports = router;