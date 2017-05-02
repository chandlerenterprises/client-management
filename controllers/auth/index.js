var express = require('express');
var router = express.Router();

/*
 
 AUTH CONTROLLER

*/

router.post('/signin', function(req, res) {
  require('./signin')(req, res)
})

router.post('/signup', function(req, res) {
  require('./signup')(req, res)
})

router.get('/', function(req, res) {
  res.render('auth')
})

module.exports = router;

//....
