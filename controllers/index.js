var express = require('express');
var router = express.Router();

/*
 
 BASE CONTROLLER

*/

router.use('/auth/', require('./auth'));
router.use('/dashboard/', require('./dashboard'));
router.use('/commission/', require('./commissions'));
router.use('/deliverable/', require('./deliverables'));

router.get('/', function(req, res) {
  res.render('dev')
})

//router.use('/dev', require('./unorganized'));
//router.use('/profile', require('./profile'));
//router.use('/search', require('./search'));

module.exports = router;
