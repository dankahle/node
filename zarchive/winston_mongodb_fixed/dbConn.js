var mongodb = require('mongodb'),
	MongoClient = mongodb.MongoClient,
	Q = require('q'),
	def = Q.defer()

module.exports = def.promise;

MongoClient.connect('mongodb://localhost:27017/db', function (err, db) {
	if (err) return def.reject(err);
	def.resolve(db)
});


/*
 var mongoose = require('mongoose'),
 Q = require('q'),
 def = Q.defer()

 var db = mongoose.createConnection('localhost', 'db');
 db.p_db = def.promise; // promise to the native driver

 db.on('error', function(err) {
 def.reject(err);
 throw err;
 })
 db.on('open', function() {
 def.resolve(db.db)
 })

 module.exports = db;
 */




