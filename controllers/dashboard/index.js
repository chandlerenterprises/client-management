var express = require('express');
var router = express.Router();

/*
 
 UNASSINGED CONTROLLER

*/

router.get('/', function(req, res) {
  require('./loadDev')(req, res)
})


module.exports = router;