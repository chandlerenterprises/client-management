var jwtHandler = require(global.base+'/middleware/jwtHandler')

module.exports = function(server) {

  var socketio = require('socket.io'), io = socketio.listen(server);

  io.on('connection', function(socket) {
    
    socket.on('store socket session', function(token) {
      jwtHandler.socketio(socket, token)
    })
    
  })

}