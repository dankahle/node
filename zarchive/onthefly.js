
var traceur = require('traceur');
traceur.require.makeDefault(function(filename) {
	var b = filename.indexOf('node_modules') === -1;
	//console.log(b, filename)
	// don't transpile our dependencies, just our app
	return filename.indexOf('node_modules') === -1;
});

require('./../nes6/app.js');

