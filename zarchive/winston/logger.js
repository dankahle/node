var winston = require('winston')
require('winston-mongodb').MongoDB // adds the transport to winston automatically
require('winston-mail').Mail

module.exports = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)({level: 'error'}),
		new (winston.transports.DailyRotateFile)({
			level: 'info',
			filename: 'logs/web.log',
			exitOnError: false
		}),
		new (winston.transports.MongoDB)({
			level: 'info',
			db: 'mongodb://localhost:27017/db', // db.p_mongo if a promise
			collection: 'prodlog',
			exitOnError: false
		}),
		new (winston.transports.Mail)({
			level: 'error',
			exitOnError: false,
			host: 'smtp.gmail.com',
			port: 465,
			ssl: true,
			username: 'dan.kahle',
			password: '...',
			from: 'Prod server <noreply@lala.com>',
			to: 'dan.kahle@gmail.com'
		})
	],
	exceptionHandlers: [
		new (winston.transports.File)({
			filename: 'logs/exceptions.log',
			exitOnError: false
		})
	]
});



