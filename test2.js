





var request = require('http').request;

var opts = {
   method: 'GET',
   hostname: 'localhostt',
   port: 5000,
   path: '/',
};

var myReq = request(opts, function (myRes) {
   var statusCode = myRes.statusCode
      , headers = myRes.headers;

   myRes.on('error', function (err) {
      console.log('res onerror', err)
   });

   myRes.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
   });

   // console.log(myRes)
});

myReq.on('error', function (err) {
   console.log('req onerror', err)
});

myReq.end();
