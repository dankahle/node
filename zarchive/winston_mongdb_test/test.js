
var logger = require('./logger')(),
	db = require('./dbconn')()


logger.silly('hey')
logger.debug('hey')
logger.verbose('hey')
logger.info("127.0.0.1 - there's no place like home");
logger.warn("127.0.0.1 - there's no place like home");
logger.error("127.0.0.1 - there's no place like home");
