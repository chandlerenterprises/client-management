var errorHandler = require(global.base+'/middleware/errorHandler')
var getUserType = require(global.base+'/resources/getUserType')
module.exports = function(req, res) {
  
  var username = res.locals.username
  var id = req.params.id, select = '-_id -advisor._id'
  if(res.locals.advisoryId != id) select += '-assignments -invites -id'
  
  global.models.advisory.findOne({ _id : id }).select(select).populate({
    path : 'advisor._id',
    select : '-google.id -google.tokens -advisory._id -blog -messaging'
  }).exec(function(err, advisory) {
    if(err) return errorHandler.mongo(err);
    
    if(!advisory) return res.error('this advisory doesnt exist')
    
    res.render('./advisory/home', advisory);
  });

}