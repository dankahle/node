var express = require('express'),
	bodyParser = require('body-parser'),
	users = require('./users.json'),
	errorhandler = require('errorhandler'),
	restfulRouter = require('restful-router')

var app = express()
app.use(express.static('public'))
app.use(bodyParser.json())

var forumRouter = express.Router();
var threadRouter = express.Router();

restfulRouter({
	app: forumRouter,
	name: 'forum',
	controller: require('./forum'),
	key: 'forumId'
})

restfulRouter({
	app: threadRouter,
	name: 'thread',
	baseURL: '/forum/:forumId',
	controller: require('./thread'),
	key: 'threadId'
})

app.use(forumRouter)
app.use('/stuff', threadRouter)

app.use(function(req, res) {
	res.status(404).send('Oops, file not found')
})

if(process.env.NODE_ENV == 'development')
	app.use(errorhandler())
app.use(function(err, req, res, next) {
	console.error(err.stack)
	res.status(500).send('Oops, we had a problem. Please try again.')
	//mail.sendErrorMail();
})



app.listen(3000, function() {
	console.log('server started on 3000')
})
