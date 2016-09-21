
var express = require('express')
	, resource = require('express-resource')
	, app = express();

var main = app.resource(require('./../controllers/main'));
app.resource('forums', require('./../controllers/forum'));
//var threads = app.resource('threads', require('./controllers/thread'));
//forums.add(threads);

app.listen(3000);
console.log('Listening on :3000');