
var express = require('express'),
  http = require('http'),
  domainMiddleware = require('domain-middleware'),
  userRouter = require('./edm_userRouter'),
  bodyParser = require('body-parser'),
  apiErrorHandler = require('api-error-handler'),
  domain = require('domain')

var serverDomain = domain.create();

serverDomain.run(function() {

  var app = express()
  var server = http.createServer(app)
  app.use(domainMiddleware({server: server}))
  app.use(function(req, res, next) {
    next()
  })
  app.use(express.static('public'))
  app.use(bodyParser.json())
  app.use(userRouter)


  app.use(function(req, res) {
    res.status(404).send('Oops, file not found')
  })

  app.use(function errorHandler(err, req, res, next) {
    console.log('error on request %d %s %s', process.pid, req.method, req.url);
    // so if timer or req/res emit('error') then domain.error is called which restarts the server and calls this handler, so we call next(err)
    // to call apiErrorHandler, but if regular exception, then domain.error isn't called
    // we need it called to restart the server. If domain.error is called then err will have a domain property, so if no domain property
    // well use req/res emit('error') to call domain.error, it will call next(err) which will be apiErrorHandler so we won't call next(err) in that case.

    if(!err.domain) { // domain.error hasn't run
      console.log('>>>>>> emit req.error')
      req.emit('error', err) // call fire domain.error which calls next(err) (apiErrorHandler)
    }
    else
      next(err) // domain.error has run so just call apiErrorHandler
  });

  app.use(apiErrorHandler())

  server.listen(3000, function() { console.log('listening on 3000')})

})
