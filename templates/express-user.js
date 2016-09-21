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




app.use(function(req, res) {
  res.status(404).send('Oops, file not found')
})

app.use(apiErrorHandler())

app.listen(3000, function() {
  console.log('server started on 3000')
})
