
var mongodb = require('mongodb'),
	MongoClient = mongodb.MongoClient,
	Q = require('q'),
	def = Q.defer(),
	db,
	initialized


module.exports = function(init) {
	if(init && db)
		return Q(db)
	else if(init && initialized)
		return def.promise;
	else if(init ) {
		initialized = true;
		MongoClient.connect('mongodb://localhost:27017/db', function (err, _db) {
			if (err) return def.reject(err);
			db = _db;
			def.resolve(_db)
		});
		return def.promise;
	}
	else
		return db;
}



/*
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

module.exports = db;*/
