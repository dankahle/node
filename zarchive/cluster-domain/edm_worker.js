var express = require('express'),
  http = require('http'),
  expressDomainMiddleware = require('express-domain-middleware'),
  userRouter = require('./c_userRouter'),
  bodyParser = require('body-parser'),
  apiErrorHandler = require('api-error-handler'),
  serverShutdown = require('./edm_serverShutdown'),
  domain = require('domain'),
  cluster = require('cluster')

var serverDomain = domain.create();
serverDomain.on('error', function (err) {
  console.error('serverDomain error on startup.', err.stack)
  process.send({cmd: 'serverDomainError'}) // send message to the cluster to shut down
})

// this domain is to catch all server startup throws, and shutdown cluster
serverDomain.run(function () {

  //throw new Error('server startup errro') // this will shutdown cluster

  var app = express()
  var server = http.createServer(app)
  app.use(expressDomainMiddleware)
  app.use(express.static('public'))
  app.use(bodyParser.json())
  app.use(userRouter)

  // for watching round robin
  app.use(function(req, res, next) {
    console.log('request on worker %s: %s - %s', cluster.worker.id, req.method, req.url);
    res.send('done')
  })

  app.use(function (req, res) {
    res.status(404).send('Oops, file not found')
  })

  app.use(function errorHandler(err, req, res, next) {
    console.log('handler: error on request %d %s %s', process.pid, req.method, req.url);
    process.nextTick(function () {
      serverShutdown(err, req, res, {
        server: server,
        killTimeout: 3000
      })
    })
    next(err)
  });

  app.use(apiErrorHandler())

  server.listen(3000, function () {
    console.log('master: %s, worker: %s - listening on 3000', process.env.masterPid, cluster.worker.id)
  })


})




