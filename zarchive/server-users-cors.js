
var _ = require('lodash');
var express = require('express');
var app = express(),
	users = require('./users'),
	bodyParser = require('body-parser')


app.use(bodyParser())
require('./common/json-body-parser')(app);

app.use(function(req, res, next){
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
	if(req.headers['access-control-request-headers'])
		res.setHeader("Access-Control-Allow-Headers", req.headers['access-control-request-headers']);
	if ('OPTIONS' == req.method)
		res.send(200);
	else
		next();
})

app.post('/', function(req, res){
	console.log(req.body);
	res.send({name: 1})
})

app.get('/', function(req, res){
	console.log(req.query);
	res.send({name: 1})
})

app.get('/test.js', function(req, res) {
	res.send('this.shit = "stuff";');
})

app.get('/test.json', function(req, res) {
	console.log('test.json')
	res.send(JSON.stringify(users.getUsers()))
})

app.get('/api/users', function(req, res){
	res.send(users.getUsers());
})

app.get('/api/users/:id', function(req, res){
	res.send(users.getUser(req.params.id));
})

app.get('/api/users/:id/messages', function(req, res){
	res.send(users.getMessages(req.params.id));
})

app.get('/api/users/:id/messages/:messageId', function(req, res){
	res.send(users.getMessage(req.params.id, req.params.messageId));
})

app.listen(3000, function(){console.log('listening on 3000')});
