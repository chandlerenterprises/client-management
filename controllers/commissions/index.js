var express = require('express');
var router = express.Router();

/*
 
 UNASSINGED CONTROLLER

*/

router.get('/request', function(req, res) {
  require('./requestCom')(req, res)
})

router.post('/accept', function(req, res) {
  require('./acceptCom')(req, res)
})

router.post('/create', function(req, res) {
  require('./createCom')(req, res)
})

router.post('/addDeliverable', function(req, res) {
  require('./addDeliverable')(req, res)
})

router.post('/removeDeliverable', function(req, res) {
  require('./addDeliverable')(req, res)
})


module.exports = router;