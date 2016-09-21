
exports.list = function(req, res){
  res.send('forum ' + req.forum.id  );
};

exports.new = function(req, res){
  res.send('new forum ');
};

exports.create = function(req, res){
  res.send('forum created');
};

exports.show = function(req, res){
  res.send('forum ' + req.forum.id + ' thread ' + req.thread.id );
};

exports.edit = function(req, res){
  res.send('editing forum ' + req.forum.id + ' thread ' + req.thread.id);
};

exports.update = function(req, res){
	res.send('update forum ' + req.forum.id + ' thread ' + req.thread.id);
};

exports.load = function(threadId, fn){
	process.nextTick(function(){
		// hit db with id to get forum info and return it
		var thread = {id: threadId};
		fn(null, thread)
	})
};
