
var p_async2 = require('./async2')

p_async2.then(function(async2) {
	console.log(async2)
}, function(err) {
	console.error(err);
})
