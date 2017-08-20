var express = require('express'),
  bodyParser = require('body-parser'),
  apiErrorHandler = require('api-error-handler'),
  userRouter = require('./user/userRouter'),
  cors = require('cors');

var app = express()
app.use(cors());
app.use(bodyParser.json());

app.use(function tap(req, res, next) {
  console.log(req.url);
  next();
})

app.use('/api/users', userRouter);

app.use(function (req, res) {
  res.status(404).send('Oops, file not found')
})
app.use(apiErrorHandler())
app.listen(3005, function() {
  console.log('listening on 3005');
});
