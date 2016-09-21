

var index = function(req, res){
  res.send('forum index');
};

var _new = function(req, res){
  res.send('new forum');
};

var create = function(req, res){
  res.send('create forum');
};

var show = function(req, res){
  res.send('show forum ' + req.forum.title);
};

var edit = function(req, res){
  res.send('edit forum ' + req.forum.title);
};

var update = function(req, res){
  res.send('update forum ' + req.forum.title);
};

var destroy = function(req, res){
  res.send('destroy forum ' + req.forum.title);
};

var load = function(req, res, next){
  process.nextTick(function(){
	req.forum =  { title: 'Bunnies' };
	  next()
  });
};

var express = require('express')
router = express.Router()

router.route('/')
	.get(index)
	.post(create)

router.route('/new')
	.get(_new)

router.route('/:id/edit')
	.all(load)
	.get(edit)

router.route('/:id')
	.all(load)
	.get(show)
	.put(update)
	.delete(destroy)


module.exports = router
