//var student = require(global.base+'/models/student');
//var advisor = require(global.base+'/models/advisor'); 
//var advisory = require(global.base+'/models/advisory'); 

var errorHandler = require(global.base+'/middleware/errorHandler');
var moment = require('moment');
var crypto = require("crypto");
var async = require('async');

module.exports = function() {
  global.serverSessionId = crypto.randomBytes(20).toString('hex');
  global.models = {
    dev : require(global.base+'/models/dev'),
    client : require(global.base+'/models/client'),
    commission : require(global.base+'/models/commission'),
    deliverable : require(global.base+'/models/deliverable')
  }
/*
  global.serverSessionId = crypto.randomBytes(20).toString('hex');
  global.advisors = [], global.students = [], global.advisories = {}
  
  global.models = {
    student : require(global.base+'/models/student'),
    advisor : require(global.base+'/models/advisor'),
    advisory : require(global.base+'/models/advisory')
  }
*/
}
