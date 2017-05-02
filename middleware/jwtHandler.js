var jwt = require('jwt-simple');

var authentication = require(global.base+'/config/auth.json');

module.exports = function(req, res, next) {
  var error, decoded, authenticated

  if(req.headers.cookie || req.body.token) {
    var cookies = req.headers.cookie.split(';'), token;
    
    for(var a in cookies) {
      var cookie = cookies[a].split('=');
      if(cookie[0] == authentication.tokenNames.main.name) token = cookie[1];
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

  if(error && error !== 'no token provided') {
    return res.error(error);
  }
  
  if(decoded) {
    authenticated = true;
    res.locals['userId'] = decoded.iss;
    res.locals['userType'] = decoded.userType;
  }
  
  res.locals['authenticated'] = authenticated;

  next();
}