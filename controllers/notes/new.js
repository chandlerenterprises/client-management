var moment = require('moment')
var errorHandler = require(global.base+'/middleware/errorHandler')

module.exports = function(req, res) {
  var destination = req.params.destination
  if(destination !== 'deliverable' || destination !== 'global') return res.error('invalid note destination')
  
}