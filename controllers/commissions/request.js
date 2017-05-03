var moment = require('momentum')

var errorHandler = require(global.base+'/middleware/errorHandler')
var Client = require('../models/client')
var Request = require('../models/request')
var Dev = require('../models/dev')

module.exports = function(req, res) {
  
  var chosenDevs = req.body.chosenDevs
  var budget = { min : req.body.min, max : req.body.max }
  var newRequest = {
    budget : budget,
    description : req.body.description,
    similarProducts : req.body.similarProducts
  }
  
  if(budget.min < 0 || budget.max < 0 || budget.min > budget.max) return res.error('please select a valid budget range!')
  if(req.body.description.length < 50) return res.error('please tell us more about what you are looking for!')
  
  Client.find({ _id : res.locals.userId }).populate({
    path : "requests"
  }).exec(function(err, client) {
    
    if(err) return errorHandler.mongo(err)
    if(client.requests.length == 2) return res.error('you can only have a max of two commission requests at a time!')

    Dev.find({ _id : { $in : chosenDevs } }, function(err, devs) {
      
      if(err) return errorHandler.mongo(err)
      if(!devs[0]) return doneFunc(res, newRequest);
      else {
        var parsedDevUserIds = [], parsedDevDocs = []

        for(var a in devs) {
          if(devs[a].status == 'available') {
            parsedDevDocs.push(devs[a]), parsedDevUserIds.push(devs[a]._id)
          }
        }

        if(parsedDevDocs.length > 0) {
          newRequest['chosenDevs'] = parsedDevUserIds;
          doneFunc(res, newRequest, parsedDevDocs)
        }
      }
    })
    
  })
}

function doneFunc(res, newRequest, parsedDevDocs) {
  Request.create(newRequest, function(err, results) {
    
    if(err) return errorHandler.mongo(err)
    if(parsedDevDocs) {
      for(var a in parsedDevDocs) {
        parsedDevDocs[a].requests.push(results._id)
        parsedDevDocs[a].save()

        global.sockets[parsedDevDocs[a]._id].emit('commission request', { // emit to dev
          name : res.locals.name,
          email : res.locals.email
        })
      }
    }
    
    global.sockets.admin
    
    res.success()
    
  })
}