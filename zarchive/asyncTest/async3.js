
var Q = require('q'),
	def = Q.defer()

module.exports = def.promise;

setTimeout(function() {
	def.resolve({fname: 'async3.txt'})
}, 1000)

