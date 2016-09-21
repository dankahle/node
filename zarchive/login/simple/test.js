var express = require('express'),
  bodyParser = require('body-parser'),
  apiErrorHandler = require('api-error-handler'),
  expressDomainMiddleware = require('express-domain-middleware')


var app = express()

var token;
app.get('/login', express.static('login'))

app.post('/login', function(req, res, next) {
  if((token = checkDbUsernamePassword())){
    setCookie('token', token)
    res.resdirect(req.query.redirectUrl)
  }
  else
    res.send('login error')
})

app.use(function(req, res, next) {
  if(tokenInHeader())
    next();
  else {
    res.redirect('/login/index.html?redirectUrl=escape(req.url)')
    auth = true;
  }
})


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
