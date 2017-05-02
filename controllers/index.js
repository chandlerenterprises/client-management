var express = require('express');
var router = express.Router();

/*
 
 BASE CONTROLLER

*/

router.use('/auth/', require('./auth'));
router.use('/dev', require('./unorganized'));

//router.use('/profile', require('./profile'));
//router.use('/search', require('./search'));

module.exports = router;