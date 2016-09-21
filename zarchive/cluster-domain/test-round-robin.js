


var request = require('request')

for(var i = 0; i < 10; i++)
request('http://localhost:3000/throw', function(err, resp, body) {
    console.log('request: ' + i + 'done')
})


