var express = require('express');
var router = express.Router();

/*
 
 DELIVERABLE CONTROLLER

*/

router.post('/claim', function(req, res) {
  require('./claim')(req, res)
})

router.post('/new', function(req, res) {
  require('./new')(req, res)
})

router.post('/delete', function(req, res) {
  require('./delete')(req, res)
})



module.exports = router;