
var _ = require('lodash')


module.exports = function(app) {

	var isNameValueArray = function (arr) {
		if (arr.length == 0)
			return false;

		var result = true;
		arr.forEach(function (v) {
			if (!_.isObject(v)) {
				result = false;
				return;
			}
			var keys = _.keys(v).map(function (v) {
				return v.toLowerCase();
			});
			if (keys.length != 2 || keys.indexOf('name') == -1 || !keys.indexOf('value') == -1)
				result = false;
		});
		return result;
	}

	app.post('*', function(req, res, next) {
		if(req.body && _.isArray(req.body) && isNameValueArray(req.body)) {
			var arr = req.body;
			req.body = {};
			arr.forEach(function(v) {
				req.body[v.name] = v.value;
			})
		}
		next();
	})

}

