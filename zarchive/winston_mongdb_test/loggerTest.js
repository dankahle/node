var Q = require('q'),
  p_logger = require('./logger')('init'),
  p_db = require('./dbconn')('init')


Q.all([p_logger, p_db]).then(function(results) {

  test = require('./test')



}, function(err) {
  throw err;
})



