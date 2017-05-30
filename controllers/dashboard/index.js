var express = require('express');
var router = express.Router();

/*
 
 UNASSINGED CONTROLLER

*/

router.get('/', function(req, res) {
  require('../commissions/load')(req, res)
})


module.exports = router;