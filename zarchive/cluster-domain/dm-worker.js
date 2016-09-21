var http = require('http');
var express = require('express');
var domainMiddleware = require('domain-middleware');


var app = express()
var server = http.createServer(app);

app.use(domainMiddleware({
  server: server,
  killTimeout: 3000
}))

app.get('/api/timer', function(req, res) {
  setTimeout(function() {
    throw new Error('timer error')
  },100)
})

app.get('/api/throw', function(req, res) {
  throw new Error('throwing error')
})


/*
app.use(function (req, res, next) {
  if (req.url === '/timer') {
    return;
  }
  else if (req.url === '/throw') {
    throw new Error('throwing err')
  }
  else
    res.end(req.method + ' ' + req.url + ', headers: ' + JSON.stringify(req.headers));
})
*/

app.use(function (err, req, res, next) {
  var domainThrown = err.domain_thrown || err.domainThrown;
  var msg = 'err handler: domainThrown: ' + domainThrown + '\n' + err.stack;
  console.error('%s %s\n%s', req.method, req.url, msg);
  res.statusCode = 500;
  res.setHeader('content-type', 'text/plain');
  res.end(msg + '\n');
})
server.listen(3000);

console.log('[%s] [worker:%s] start listen on %s', new Date(), process.pid, 3000);