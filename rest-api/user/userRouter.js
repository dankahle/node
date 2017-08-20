
var express = require('express'),
  repo = require('./userRepo');

router = express.Router();
module.exports = router;


router.get('/', function(req, res){
  res.send(repo.getAll());
})

router.get('/:id', function(req, res){
  const user = repo.getOne(req.params.id);
  if (user) {
    res.send(user);
  }
  res.status(404).end();
})

router.post('/', function(req, res) {
  res.send(repo.add(req.body));
})

router.put('/:id', function(req, res) {
  const user = repo.update(req.params.id, req.body);
  if (user) {
    res.send(user);
  }
  res.status(404).end();
})

router.delete('/:id', function(req, res){
  const count = repo.remove(req.params.id);
  if (count) {
    res.send({count: count});
  }
  res.status(404).end();
})

