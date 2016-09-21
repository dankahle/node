
var mongoose = require('mongoose'),
	Q = require('q'),
	def = Q.defer()

var db = mongoose.createConnection('localhost', 'db');
db.p_mongo = def.promise;
db.on('error', function(err) {
	db.p_mongo.reject(err);
	throw err;
})
db.on('open', function(a,b) {
	def.resolve(db)
})

module.exports = db;

