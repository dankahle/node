
var http = require('http'),
   express = require('express'),
   sockets = [];



var app = express();
app.get('/', function(req, res) {
   res.send('here' + new Date);
})

var server = http.createServer(app);

server.on('connection', function(socket) {
   sockets.push(socket);
})

server.listen(3005, function() {
   console.log('listening on 3005')
})



server.on('close', function() {
   console.log('close event');
/*
   server.listen(3005, function() {
      console.log('listening yet again')
   })
*/
})

setTimeout(function() {
   console.log('closing...', 'num sockets: ' + sockets.length);


   process.removeAllListeners('uncaughtException');
   process.removeAllListeners('SIGINT');
   process.removeAllListeners('SIGTERM');

   /*
      sockets.forEach(function(socket) {
         socket.destroy();
      })
   */

   server.close(function() {
      console.log('close() handler')
   });
}, 5000)
