var express = require('express'),
	bodyParser = require('body-parser'),
	apiErrorHandler = require('api-error-handler'),
	expressDomainMiddleware = require('express-domain-middleware'),
   url = require('url')

var app = express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(expressDomainMiddleware)

app.use(function(req, res, next) {
   next();
})

app.get('/user/:id', function(req, res) {
   res.json({
      id: req.params.id
   })
})

app.get('/setcookie', function(req, res) {
   var val = req.query.val;
   if(!val) {
      console.log('no val')
      val = null;
   }
   res.cookie('mycookie', val);
   res.send('cookie set to ' + val);
})

app.post('/user', function(req, res) {
   req.body.id = 'newid'
   res.send(req.body);
})

app.use(function(req, res, next){
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
	if(req.headers['access-control-request-headers'])
		res.setHeader("Access-Control-Allow-Headers", req.headers['access-control-request-headers']);
	if ('OPTIONS' == req.method)
		res.end()
	else
		next();
})




app.use(function (req, res) {
	res.status(404).send('Oops, file not found')
})

app.use(apiErrorHandler())

app.listen(3002, function () {
	console.log('server started on 3002')
})
