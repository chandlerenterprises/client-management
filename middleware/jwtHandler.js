var jwt = require('jwt-simple');

var authentication = require(global.base+'/config/auth.json');

module.exports = function(io, req, res, next) {
  var error, decoded, authenticated

  if(req.headers.cookie || req.body.token || io.token) {
    var cookies = req.headers.cookie.split(';'), token;
    
    if(io.token) token = io.token
    
    if(cookies[0]) {
      for(var a in cookies) {
        var cookie = cookies[a].split('=');
        if(cookie[0] == authentication.tokenNames.main.name) token = cookie[1];
      }
    }
    
    if(!token || token.length == 0 || token == 'undefined') error = 'no token provided';
    else {
      try {
        decoded = jwt.decode(token, authentication.secretJWTKey);
        if(global.serverSessionId != decoded.serverSessionId || decoded.exp <= Date.now()) {
          error = 'session expired';
        }
      }
      catch(err) { error = 'invalid token' }
    }
  }
  
  if(decoded) {
    authenticated = true;

    if(io) return global.sockets[decoded.userType].push({ 
      userId : decoded.userId, 
      socket : io.socket
    })
  } else {
    decoded = {}

    if(error) {
      if(io) return global.sockets.guests.push(io.socket)
      else if(error !== 'no token provided') return res.error(error);
    }
  }
  
  res.locals = Object.combine(decoded, { authenticated : authenticated })

  next();
}