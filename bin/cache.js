//var student = require(global.base+'/models/student');
//var advisor = require(global.base+'/models/advisor'); 
//var advisory = require(global.base+'/models/advisory'); 

var errorHandler = require(global.base+'/middleware/errorHandler');
var moment = require('moment');
var crypto = require("crypto");
var async = require('async');

module.exports = function() {

  global.models = {
    dev : require(global.base+'/models/dev'),
    client : require(global.base+'/models/client'),
    commission : require(global.base+'/models/commission'),
    deliverable : require(global.base+'/models/deliverable')
  }

  global.sockets = {
    devs : [],
    clients : [],
    guests : []
  }

  global.serverSessionId = crypto.randomBytes(20).toString('hex');
  global.expiredTokens = []
  
  console.log(global.sockets)
  
}