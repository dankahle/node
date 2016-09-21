var express = require('express'),
	bodyParser = require('body-parser'),
	users = require('./../../users.json'),
	apiErrorHandler = require('api-error-handler')
  expressDomainMiddleware = require('express-domain-middleware')

var app = express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(expressDomainMiddleware)

app.get('/api/user', function(req, res) {
  res.send(users)
})

app.post('/api/user', function(req, res) {
  users.push(req.body)
  res.send(users)
})

app.get('/api/timer', function(req, res) {
  setTimeout(function() {
    throw new Error('timer error')
  },100)
})

app.get('/api/throw', function(req, res) {
  throw new Error('throwing error')
})


app.use(function(req, res) {
	res.status(404).send('Oops, file not found')
})

app.use(function errorHandler(err, req, res, next) {
  console.log('handler: error on request %s %s', req.method, req.url);
//  console.log('error on request %d %s %s', process.domain.id, req.method, req.url);
  //console.log(err.stack);
  //res.send(500, "Something bad happened. :(");
  next(err)
  if(err.domain) {
    //you should think about gracefully stopping & respawning your server
    //since an unhandled error might put your application into an unknown state
  }
});

app.use(apiErrorHandler())

app.listen(3000, function() {
	console.log('server started on 3000')
})
