
var express = require('express'),
	repo = require('./userRepoMongoose')

router = express.Router();
module.exports = router;

function pullOutErrMsg(err) {
	if(err.errors) {
		var message = '';
		for(prop in err.errors)
			message += err.errors[prop].message + '\n';
		err.message = message;
	}
}

function handleError(err) {
	pullOutErrMsg(err);
	console.error('pullout: ', err);
	throw err;
}

/////////// /user

router.get('/', function(req, res){
	repo.getUsers( req.query, function(err, users) {
		if(err) return handleError(err);
		res.send(users);
		console.log('done')
	})
})

router.get('/page', function(req, res){
	repo.getUsersPage(req.query.pageno, req.query.pagesize, req.query.sort, function(err, resp) {
		if(err) return handleError(err);
		res.send(resp);
	})
})

router.get('/:id', function(req, res){
	repo.getOneUser(req.params.id, function(err, user) {
		if(err) return handleError(err);
		if(err) return console.error(err);
		res.send(user);
	})
})

router.post('/', function(req, res) {
	repo.add(req.body, function(err, user) {
		if(err) return handleError(err);
		res.send(user);
	})
})

router.put('/:id', function(req, res) {
	repo.update(req.body, function(err, user) {
		if(err) return handleError(err);
		res.send(user);
	})
})

router.delete('/:id', function(req, res){
	repo.remove(req.params.id, function(err, result) {
		if(err) return handleError(err);
		res.send(result);
	})
})

/////////// /user/:id/messages
router.get('/:userId/messages', function(req, res){
	repo.getMessages(req.params.userId, function(err, messages) {
		res.send(messages);
	})
})

router.get('/:userId/messages/:messageId', function(req, res){
	repo.getOneMessage(req.params.userId, req.params.messageId, function(err, message) {
		res.send(message);
	})
})

router.post('/:userId/messages', function(req, res) {
	repo.addMessage(req.params.userId, req.body, function(err, message) {
		res.send(message);
	})
})

router.put('/:userId/messages/:id', function(req, res) {
	repo.updateMessage(req.params.userId, req.body, function(err, message) {
		res.send(message);
	})
})

router.delete('/:userId/messages/:messageId', function(req, res){
	repo.removeMessage(req.params.userId, req.params.messageId, function(err, response) {
		res.send(response);
	})
})


