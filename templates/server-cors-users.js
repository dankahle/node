
var _ = require('lodash');
var express = require('express');
var app = express(),
	users = require('./users')

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
