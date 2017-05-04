var jwt = require('jwt-simple');

var authentication = require(global.base+'/config/auth.json');

exports.express = function(req, res, next) {
  var error, decoded, token

  if(req && req.headers.cookie) { //checks both cookies and body for JWT
    var cookies = req.headers.cookie.split(';')

    if(cookies[0]) {
      for(var a in cookies) {
        var cookie = cookies[a].split('=');
        if(cookie[0] == 'JWT') token = cookie[1];
      }
    }
    
    if(!token && req.body.token) token = req.body.token
  }
  
  handler(token, function(error, decoded) {
    if(error && error !== 'no token provided') return res.error(error) //signout, redirect to 404 page
    if(!decoded) decoded = {}

    res.locals = Object.assign(decoded, { authenticated : decoded })
    next()
  })

}

exports.socketio = function(socket, token) {
  handler(token, function(error, decoded) {
    if(error) return global.sockets.guests.push(socket)

    global.sockets[decoded.userType + 's'].push({ 
      userId : decoded.userId, 
      socket : socket
    })
  })
}

function handler(token, cb) {
  var error, decoded, authenticated
  
  if(!token || token.length == 0 || token == 'undefined') error = 'no token provided';
  else {
    try {
      decoded = jwt.decode(token, authentication.secretJWTKey); //this is what would trigger catch
      
      console.log(decoded)
      
      if(!decoded.admin) {
        if(global.serverSessionId != decoded.serverSessionId || decoded.exp <= Date.now()) error = 'session expired';
        for(var a in global.expiredTokens) {
          if(global.expiredTokens[a] == token) error = 'session expired'
        }
      }
    }
    catch(err) { error = 'invalid token' }
  }
  
  cb(error, decoded)
}