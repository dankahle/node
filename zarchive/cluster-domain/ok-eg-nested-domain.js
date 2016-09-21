
var http = require('http')
var ok = require('okay');
var domain = require('domain');
var count = 0;
var handler = function(req, res) {
  var requestDomain = domain.create();
  req.id = new Date + (count++);
  requestDomain.add(req);
  requestDomain.add(res);
  requestDomain.on('error', function(err) {
    console.log('error handling request ' + req.id);
    console.log(err);
    try {
      res.statusCode= 500;
      res.end(http.STATUS_CODES[500]);
    } catch(e) {
      console.log('could not send response 500 code:', e);
    }
  });
  requestDomain.run(function() {
    process.nextTick(function() {
      setTimeout(function() {
        //read some missing file to cause an error
        //the error will fire on the request's domain
        //and WILL NOT crash the server
        if(count % 2) {
          fs.readFile('omsdflksjdflsk', ok(function(contents) {
            res.writeHead(200);
            res.end('ok');
          }));
        } else {
          //this exception will fire on the request's domain
          //as well and will also NOT crash the server
          process.nextTick(ok(function() {
            throw new Error("I Broke it.")
          }));
        }
      }, 1000);
    })
  })
}

var serverDomain = domain.create();
serverDomain.on('error', function(e) {
  console.log('something happened with the server!')
  console.log(e);
});
serverDomain.run(function() {
  var server = http.createServer(handler);
  server.listen(3000);
});