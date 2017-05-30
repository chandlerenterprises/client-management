var moment = require('moment')
var async = require('async')
var errorHandler = require(global.base+'/middleware/errorHandler')

module.exports = function(req, res) {
  var body = req.body, clients = ( body.clients[0] ? body.clients : [] )
  
  if(!clients[0]) return res.error('Please provide at least one client')
  if(body.desc && body.desc.length > 500) return res.error('Please provide a shorter description')

  async.parallel({
    devs: function(cb) {
      global.models.dev.find({ _id : { $in : body.devs.concat([res.locals.userId]) } }, cb)
    },
    clients: function(cb) {
      global.models.client.find({ _id : { $in : clients } }, cb)
    }
  }, function(err, results) {
    if (err) return errorHandler.mongo(err)
    
    if(!results.clients[0]) return res.error('None of the provided clients were found')
    else if(results.clients.length < clients.length) {
      for(var a in clients) {
        for(var b in results.clients) {
          if(clients[a] == results.clients[b]) clients.splice(a, 1)
        }
      }
      return res.error('clients not found', clients)
    }

    var usersToSave = results.clients.concat(results.devs)
    for(var a in body.devs) {
      if(body.devs[a] == res.locals.userId) body.devs[a].splice(a, 1)
    }
    var commission = {
      creator : res.locals.userId,
      devs : body.devs,
      clients : clients,
      title : body.title,
      payment : body.payment,
      desc : body.desc
    }
    
    global.models.commission.create(commission, function(err, results) { // change to individual keys
      if(err) return errorHandler.mongo(err)
      
      for(var a in usersToSave) {
        var commissionCategory = ( usersToSave[a]._id == res.locals.userId ? 'created' : 'invites' )
        usersToSave[a].commissions[commissionCategory].push(results._id)
        usersToSave[a].save()
      }
      
      res.success('its lit', { _id : results._id })
    })
    
  })
  
}
