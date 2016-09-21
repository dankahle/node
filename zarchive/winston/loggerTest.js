//console.log(require('./logs/exceptions.log.json'))
var logger = require('./logger')

//logger.transports.console.level = 'debug';

logger.silly('hey')
logger.debug('hey')
logger.verbose('hey')
logger.info("127.0.0.1 - there's no place like home");
logger.warn("127.0.0.1 - there's no place like home");
logger.error("127.0.0.1 - there's no place like home");


/*
logger.query({fields: ['level', 'message']}, function(err, results) {
	if(err) console.error(err)
	console.log(results)
})
*/

/*
logger.stream({ start: -1 }).on('log', function(log) {
	console.log(log);
});
*/

