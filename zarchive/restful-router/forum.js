exports.list = function(req, res){
	res.send('list forums');
};

exports.show = function(req, res){
	res.send('show forum ' + req.params.forumId);
};

exports.edit = function(req, res){
	res.send('edit forum ' + req.params.forumId);
};

exports.create = function(req, res){
	res.send('create forum ' + req.params.forumId);
};

exports.update = function(req, res){
	res.send('update forum ' + req.params.forumId);
};

exports.destroy = function(req, res){
	console.log('delete')
	res.send('delete forum ' + req.params.forumId);
};

