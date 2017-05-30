var errorHandler = require(global.base+'/middleware/errorHandler')

module.exports = function(req, res) {
  var keyword = req.params.keyword, query = { $regex: keyword, $options: 'i' }
  
  global.models.client.find({
    email : query, 
    _id : query, 
    name : { first: query, last : query }}, function(err, clients) {
    if(err) return errorHandler.mongo(err)
    
    console.log(clients)
  })
    
}