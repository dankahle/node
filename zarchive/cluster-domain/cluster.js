var cluster = require('cluster');
var http = require('http');
var count = require('./test2').count



if (cluster.isMaster) {

  // Keep track of http requests
  var numReqs = 0;
  setInterval(function() {
    console.log("numReqs =", numReqs);
  }, 2000);

  // Count requestes
  function messageHandler(msg) {
    if (msg.cmd && msg.cmd == 'notifyRequest') {
      numReqs += 1;
    }
  }

  // Start workers and listen for messages containing notifyRequest
  var numCPUs = require('os').cpus().length;
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  Object.keys(cluster.workers).forEach(function(id) {
    cluster.workers[id].on('message', messageHandler);
  });

} else {
  var server = parseInt(Math.random() * 100 + 1);
  var reqs = 0

  function getServer() { return server;}
  function getReq() { return reqs;}

  console.log('started server: ' + server)

  // Worker processes have a http server.
  http.Server(function(req, res) {
    res.writeHead(200);
    res.end("hello from fork: " + getServer() + ' reqno: ' + getReq());

    // notify master about the request
    process.send({ cmd: 'notifyRequest' });
  }).listen(3000);
}