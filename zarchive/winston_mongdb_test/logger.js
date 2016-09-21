var winston = require('winston'),
	p_db = require('./dbconn')('init'),
	Q = require('q'),
	def = Q.defer(),
	logger,
	initialized

require('winston-mongodb').MongoDB // adds the transport to winston automatically
require('winston-mail').Mail

module.exports = function(init) {
	if(init && logger)
		return Q(logger)
	else if(init && initialized)
		return def.promise;
	else if(init) {
		p_db.then(function(db) {

			logger = new (winston.Logger)({
				transports: [
					new (winston.transports.Console)({level: 'error'}),
					new (winston.transports.MongoDB)({
						level: 'info',
						//db: 'mongodb://localhost:27017/db',
						db: db,
						collection: 'prodlog',
						exitOnError: false
					})
				],
				exceptionHandlers: [
					new (winston.transports.File)({
						filename: 'logs/exceptions.log',
						exitOnError: false
					})
				]
			});
			def.resolve(logger)

		}, function(err) {
			def.reject(err)
		})
		return def.promise;
	}
	else
		return logger;
}


