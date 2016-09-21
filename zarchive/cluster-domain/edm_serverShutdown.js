var cluster = require('cluster');

module.exports = function (err, req, res, options) {
  options = options || {};
  options.killTimeout = options.killTimeout || 30000;
  if (!options.server) {
    throw new Error('server required!');
  }

  var domain = process.domain;

  // Must let current connection close.
  //res.setHeader('Connection', 'close'); // headers already sent

  // make sure we close down within `options.killTimeout` seconds
  var killtimer = setTimeout(function () {
    console.log('[%s] [worker:%s] kill timeout, exit now.', new Date(), process.pid);
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
  }, options.killTimeout);

  // But don't keep the process open just for that!
  // If there is no more io waitting, just let process exit normally.
  if (typeof killtimer.unref === 'function') {
    // only worked on node 0.10+
    killtimer.unref();
  }

  // cluster mode
  if (cluster.worker) {
    try {
      // stop taking new requests.
      // because server could already closed, need try catch the error: `Error: Not running`
      options.server.close();
      console.warn('[%s] [worker:%s] close server!',
        new Date(), process.pid);

      // Let the master know we're dead.  This will trigger a
      // 'disconnect' in the cluster master, and then it will fork
      // a new worker.
      cluster.worker.disconnect();
      console.warn('[%s] [worker:%s] worker disconnect!', new Date(), process.pid);
    } catch (er2) {
      // Usually, this error throw cause by the active connections after the first domain error,
      // oh well, not much we can do at this point.
      console.error('[%s] [worker:%s] Error on server close or worker disconnect!\n%s',
        new Date(), process.pid, er2.stack);
    }
  }
};
