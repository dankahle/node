var express = require('express'),
  bodyParser = require('body-parser'),
  //users = require('./users.json'),
  apiErrorHandler = require('api-error-handler'),
  expressDomainMiddleware = require('express-domain-middleware'),
  mongoose = require('mongoose'),
  logger = require('morgan'),
  simpleJsonstream = require('simple-jsonstream'),
  test2 = require('./test2')


mongoose.connect('mongodb://localhost:27017/db')

var userSchema = new mongoose.Schema({
  name: String,
  age: Number
})

var User = mongoose.model('User', userSchema);

var app = express()
//app.use(logger('dev'))
//app.use(express.static('public'))
app.use(bodyParser.json())
app.use(expressDomainMiddleware)



app.get('/api/user', function (req, res) {

/*
    User.find(function(err, docs) {
      res.send(docs)
    })
*/
/*
  User.findOne(function(err, doc) {
    res.send(doc)
  })
*/
  res.setHeader('content-type', 'application/json');
  User.findOne().expressify().pipe(res)

})

app.post('/api/user', function (req, res) {
  users.push(req.body)
  res.send(users)
})


app.use(function (req, res) {
  res.status(404).send('Oops, file not found')
})

app.use(apiErrorHandler())

app.listen(3000, function () {
  console.log('server started on 3000')
})
