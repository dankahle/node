
exports.list = function(req, res){
  res.send('forum index');
};

exports.new = function(req, res){
  res.send('new forum');
};

exports.create = function(req, res){
  res.send('create forum');
};

exports.show = function(req, res){
  res.send('show forum ' + req.forum.id);
};

exports.edit = function(req, res){
  res.send('edit forum ' + req.forum.id);
};

exports.update = function(req, res){
  res.send('update forum ' + req.forum.id);
};

exports.destroy = function(req, res){
  res.send('destroy forum ' + req.forum.id);
};

exports.load = function(forumId, fn){
	process.nextTick(function(){
		// hit db with id to get forum info and return it
		var forum = {id: forumId};
		fn(null, forum)
	})
};
