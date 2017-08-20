const request = require('request'),
Q = require('q'),
express = require('express'),
http = require('http'),
_ = require('lodash'),
cors = require('cors');


const urlTimeoutServer = 'http://localhost:5001';
const urlTimeoutTest = 'http://localhost:5000';
const reqTimeout = 4000;
const nodeTimeout = 2000;

// timeout server
const appTimeout = express();
appTimeout.get('/tout/timeout', function(req, res) {
// throw(new Error('bad'))
//    res.send('message from timeout')
   // do nothing for timeout
})

appTimeout.use(function(req, res, next) {
   res.status(404).send({
      message: 'Not Found'
   });
});

appTimeout.use(function(err, req, res, next) {
   let obj = _.assign({message: err.message}, err);
   res.status(500).send(obj);
});

const svrTimeout = http.createServer(appTimeout);
//svrTimeout.timeout = nodeTimeout;
svrTimeout.listen(5001, function() {
   console.log('timeout server listening on 5001')
});



// test server
const appTest = express();

appTest.use(cors());

appTest.get('/danktest', function(req, res) {
   res.send('danktest reply');
})

appTest.get('/api/timeout', function(req, res, next) {
   // const err = new Error('my mess');
   // err.stuff = 'lala';
   // throw err;

   reqq({
      url: urlTimeoutServer + '/tout/timeout'
   })
      .then((body, resp) => {
         console.log('success at api');
         res.send(body);
      })
      .catch(err => {
         console.log('error at api');
         next(err);
         // let obj = _.assign({message: err.message + 'lala', from: 'api'}, err);
         // res.status(500).send(obj);
      });

});

appTest.use(function(req, res, next) {
   res.status(404).send({
      message: 'Not Found'
   });
});

appTest.use(function(err, req, res, next) {
   let obj = _.assign({message: err.message}, err);
   res.status(500).send(obj);
});


function reqq(options) {
   const deferred = Q.defer();

   request(options, (error, response, body) => {
      if (error) {
         error.whereFrom = 'api';
         deferred.reject(error);
      } else {
         deferred.resolve(body);
      }
   });

   return deferred.promise;
}

const svrTest = http.createServer(appTest);
svrTest.timeout = nodeTimeout;
svrTest.listen(5000, function() {
   console.log('Test server listening on 5000\n');
   // console.log('http://localhost:5000/api/timeout');
});


/*
request({
   // url: urlTimeoutServer + '/tout/timeout',
   url: urlTimeoutTest + '/api/timeout',
   timeout: reqTimeout,
   headers: {'Accept': 'application/json'}
}, function(err, resp, body) {
   if (err) {
      let obj = _.assign({message: err.message}, err);
      console.log('error at call', obj);
   } else {
      if (resp.statusCode === 404) {
         console.log('success Not Found', resp.statusCode, body);
      }
      else if (resp.statusCode >= 400) {
         console.log('success error', resp.statusCode, body);
      }
      else {
         console.log('success', resp.statusCode, body);
      }

   }
})
*/
