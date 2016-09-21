var express = require('express'),
  bodyParser = require('body-parser'),
  apiErrorHandler = require('api-error-handler'),
  expressDomainMiddleware = require('express-domain-middleware')

var app = express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(expressDomainMiddleware)







app.use(function (req, res) {
  res.status(404).send('Oops, file not found')
})

app.use(apiErrorHandler())

app.listen(3000, function () {
  console.log('server started on 3000')
})
