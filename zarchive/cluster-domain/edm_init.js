var cluster = require('cluster'),
  path = require('path')

cluster.setupMaster({
  exec: path.join(__dirname, 'edm_worker.js')
});

// messages from workers
function messageHandler(msg) {
  if (msg.cmd == 'serverDomainError') {
    console.error('Shutdown cluster!')
    process.exit(1)
  }
}

// Start workers and listen for messages containing notifyRequest
var numCPUs = 2//require('os').cpus().length;
for (var i = 0; i < numCPUs; i++) {
  // can set env vars in worker by sending in an object
  cluster.fork({masterPid: process.pid}).on('message', messageHandler)
}

cluster.on('disconnect', function (worker) {
  var w = cluster.fork();
  console.error('[%s] [master:%s] worker:%s disconnect! new worker:%s fork',
    new Date(), process.pid, worker.process.pid, w.process.pid);
});

cluster.on('exit', function (worker) {
  console.error('[%s] [master:%s] worker:%s exit!',
    new Date(), process.pid, worker.process.pid);
});

