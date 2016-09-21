var mongodb = require('mongodb'),
	MongoClient = mongodb.MongoClient

var callbacks = [];

module.exports = function(cb) {
	callbacks.push(cb);

	if (callbacks.length == 1) {// for first guy, we'll open connection
		MongoClient.connect('mongodb://localhost:27017/db', function (err, db) {
			if (err) {
				callbacks.forEach(function (callback) {
					callback(err);
				})
			}
			else {
				callbacks.forEach(function (callback) {
					callback(null, db)
				})
			}
		})
	}
}

