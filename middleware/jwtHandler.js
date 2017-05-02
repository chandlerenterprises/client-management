var jwt = require('jwt-simple');

var secrets = require(global.base+'/config/secrets.json');
var authentication = require(global.base+'/config/authentication.json');

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
        decoded = jwt.decode(token, authentication.tokenNames.main.secret);
        if(global.serverSessionId != decoded.serverSessionId || decoded.exp <= Date.now()) {
          error = 'session expired';
        }
      }
      catch(err) { error = 'invalid token' }
    }
  }

  if(error && error !== 'no token provided') {
    return res.render('bounce', {
      bounce : {
        clear : true,
        msg : error,
        redirectURL : '/home/'
      }
    })
  }
  
  if(decoded) {
    authenticated = true;
    res.locals['username'] = decoded.iss;
    res.locals['decodedToken'] = decoded;
    res.locals['advisoryId'] = decoded.advisoryId;
  }
  
  res.locals['authenticated'] = authenticated;

  next();
}