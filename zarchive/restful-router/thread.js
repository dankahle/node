exports.list = function(req, res){
	res.send('list forum ' + req.params.forumId + ' threads');
};

exports.show = function(req, res){
	res.send('show forum ' + req.params.forumId + ' thread ' + req.params.threadId);
};

exports.edit = function(req, res){
	res.send('edit forum ' + req.params.forumId + ' thread ' + req.params.threadId);
};

exports.create = function(req, res){
	res.send('create forum ' + req.params.forumId + ' thread');
};

exports.update = function(req, res){
	res.send('update forum ' + req.params.forumId + ' thread ' + req.params.threadId);
};

exports.destroy = function(req, res){
	res.send('delete forum ' + req.params.forumId + ' thread ' + req.params.threadId);
};
