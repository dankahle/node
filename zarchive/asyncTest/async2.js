
var fs = require('fs'),
	Q = require('q'),
	exp = {},
	def = Q.defer(),
	async = require('async'),
	p_async3 = require('./async3')

module.exports = def.promise;


async.parallel([
	function(cbp) {
		// build all non-async stuff for export in a separate async task so builds in parallel
		var prop = 'lala'
		// this first one will be the export obj, the rest will add to it
		cbp(null, {
			prop: prop
		})
	},
	function(cbp) {
		fs.readFile('async2.txt', function(err, data) {
			if(err) return cbp(err);
			cbp(null, data.toString());
		})
	},
	// this parallel task requires async3 to complete first so we'll run a waterfall (in series with result)
	function(cbp) {
		async.waterfall([
			function(cbw){
				p_async3.then(function(async3) {
					cbw(null, async3)
				}, function(err) {
					cbw(err);
				})
			},
			function(async3, cbw) {
				fs.readFile(async3.fname, function(err, data) {
					if(err) return cbw(err);
					cbw(null, data.toString());
				})
			}
		], function(err, results) {
			if(err) return cbp(err)
			cbp(null, results)
		})
	}
],
function(err, results) {
	if(err) return def.reject(err);
	var exp = results[0];
	exp.data1 = results[1];
	exp.data2 = results[2];
	def.resolve(exp);
})