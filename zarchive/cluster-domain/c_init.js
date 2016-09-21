var cluster = require('cluster'),
  path = require('path')

cluster.setupMaster({
  exec: path.join(__dirname, 'c_worker.js')
});

// messages from workers
function messageHandler(msg) {
  if (msg.cmd && msg.cmd == 'notifyRequest') {
    console.log('server got message: ', msg.msg)
  }
}

// Start workers and listen for messages containing notifyRequest
var numCPUs = 1//require('os').cpus().length;
for (var i = 0; i < numCPUs; i++) {
  cluster.fork();
}

Object.keys(cluster.workers).forEach(function (id) {
  cluster.workers[id].on('message', messageHandler);
});

cluster.on('disconnect', function (worker) {
  var w = cluster.fork();
  console.error('[%s] [master:%s] worker:%s disconnect! new worker:%s fork',
    new Date(), process.pid, worker.process.pid, w.process.pid);
});

cluster.on('exit', function (worker) {
  console.error('[%s] [master:%s] worker:%s exit!',
    new Date(), process.pid, worker.process.pid);
});

