var express = require('express');
var router = express.Router();

/*
 
 NOTES CONTROLLER

*/

router.post('/new/:destination', function(req, res) {
  require('./new')(req, res)
})

module.exports = router;