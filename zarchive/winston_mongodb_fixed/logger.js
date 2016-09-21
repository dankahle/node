var winston = require('winston'),
	db = require('./dbconn')

require('winston-mongodb').MongoDB // adds the transport to winston automatically
//require('winston-mail').Mail


module.exports = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)({level: 'error'}),
		new (winston.transports.MongoDB)({
			level: 'info',
			db: 'mongodb://localhost:27017/db',
			//db: db.p_db,
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

