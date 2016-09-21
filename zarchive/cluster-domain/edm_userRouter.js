
var express = require('express'),
  router = express.Router(),
  fs = require('fs')

module.exports = router;

var users = [
  {name: 'dank', age: 50},
  {name: 'carl', age: 60}
]

router.get('/api/user', function(req, res) {
  res.send(users)
})

router.post('/api/user', function(req, res) {
  users.push(req.body)
  res.send(users)
})

router.get('/api/timer', function(req, res) {
  process.nextTick(function() {
    throw new Error('timer error')
  })
})

router.get('/api/file', function(req, res) {
  fs.readFile('notthere', function(err, data) {
    if(err) throw err;
  })
})

router.get('/api/callback', function(req, res) {
  getFile(process.domain.intercept(function(data) {
    if(err) throw err;
  }))
})

router.get('/api/throw', function(req, res) {
  throw new Error('throwing error')
/*
  // this or intercept still won't trigger domain.error, not sure what domain.enter/exit does
  process.domain.bind(function() {
    throw new Error('throwing error')
  })()
*/

})

function getFile(cb) {
  fs.readFile('notthere', function(err, data) {
    if(err) return cb(err)
    cb(null, data)
  })

}
