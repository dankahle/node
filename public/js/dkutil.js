

angular.module('app')
	.config(function($httpProvider) {
	$httpProvider.interceptors.push(function($q) {
		return {
			'responseError': function(resp) {
				// errorhandler:
				// var msg = '<h4>Error: ' + resp.config.method + ' ' + resp.config.url + '</h4>' + resp.data.error.stack.replace('\n', '<br>');

				// api-error-handler
				var msg = '<h4>Error: ' + resp.config.method + ' ' + resp.config.url + '<br>' +
					resp.data.status + ': ' + resp.data.message + '</h4>' +
					resp.data.stack.replace('\n', '<br>');

				$(document.body).prepend($('<p>').html(msg))
				return $q.reject(resp);
			}
		};
	});
})
