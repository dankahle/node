










/*
//sync via node
var fs = require('fs');
process.chdir('recipes'); // change the working directory
var concat = '';
fs.readdirSync('.')
	.filter(function(filename) {
// ignore directories
		return fs.statSync(filename).isFile();
	})
	.forEach(function(filename) {
// add contents to our output
		concat += fs.readFileSync(filename, 'utf8');
	});
console.log(concat)
*/




/*
//async via node with sync file opens
// how is this better? Each io call releases the thread to do other things
//(it's single threaded remember), so the system is then more responsive.
var fs = require('fs');
process.chdir('recipes'); // change the working directory
var concat = '';
fs.readdir('.', function(err, filenames) {
	if (err) throw err;
	function readFileAt(i) {
		var filename = filenames[i];
		fs.stat(filename, function(err, stats) {
			if (err) throw err;
			if (! stats.isFile()) return readFileAt(i + 1);
			fs.readFile(filename, 'utf8', function(err, text) {
				if (err) throw err;
				concat += text;
				if (i + 1 === filenames.length) {
// all files read, display the output
					return console.log(concat);
				}
				readFileAt(i + 1);
			});
		});
	}
	readFileAt(0);
});
*/


/*
// sync file filter, sync files via async call
var fs = require('fs');
process.chdir('recipes');
var concat = '';
var filenames = fs.readdirSync('.')
	.filter(function(filename) {
		return fs.statSync(filename).isFile();
	});
function readFileAt(i) {
	fs.readFile(filenames[i], 'utf8', function(err, text) {
		if (err) throw err;
		concat += text;
		if (i + 1 === filenames.length) {
			return console.log(concat);
		}
		readFileAt(i + 1);
	});
}
readFileAt(0);
*/

/*
// parallel files via promises
var fs = require('fs');
var Q = require('q');
process.chdir('recipes');
var concat = '';
var filenames = fs.readdirSync('.')
	.filter(function(filename) {
		return fs.statSync(filename).isFile();
	});
promises = [];
filenames.forEach(function(filename){
	promises.push(Q.nfcall(fs.readFile, filename, 'utf8'))
})
Q.all(promises).then(function(arr){
	arr.forEach(function(text){
		concat += text;
	});
	console.log(concat)
}, function(err){
	console.log('error: ', err.message)
})
*/

/*
// sync files via promises
var fs = require('fs');
var Q = require('q');
process.chdir('recipes');
var concat = '';
var filenames = fs.readdirSync('.')
	.filter(function(filename) {
		return fs.statSync(filename).isFile();
	});
function concatFile(index){
	Q.nfcall(fs.readFile, filenames[index], 'utf8').then(function(text){
		concat += text;
		if(index < filenames.length - 1)
			concatFile(index + 1)
		else
			console.log(concat);
	}, function(err){
		throw err;
	});
};
concatFile(0);
*/

/*
// sync files via callback, better imo
var fs = require('fs');
var Q = require('q');
process.chdir('recipes');
var concat = '';
var filenames = fs.readdirSync('.')
	.filter(function(filename) {
		return fs.statSync(filename).isFile();
	});
function concatFile(index) {
	fs.readFile(filenames[index], 'utf8', function (err, text) {
		if(err)
			throw err;
		concat += text;
		if (index < filenames.length - 1)
			concatFile(index + 1)
		else
			console.log(concat);
	});
};
concatFile(0);
*/

// async.js
// sync readdir with async filefilter and async file open, opening files in sync order


/*
var async = require('async');
var fs = require('fs');
process.chdir('recipes');
var concatenation = '';
var dirContents = fs.readdirSync('.');
async.filter(dirContents, isFilename, function(filenames) {
	async.forEachSeries(filenames, readAndConcat, onComplete);
});
function isFilename(filename, callback) {
	fs.stat(filename, function(err, stats) {
		if (err) throw err;
		callback(stats.isFile());
	});
}
function readAndConcat(filename, callback) {
	fs.readFile(filename, 'utf8', function(err, fileContents) {
		if (err) return callback(err);
		concatenation += fileContents;
		callback();
	});
}
function onComplete(err) {
	if (err) throw err;
	console.log(concatenation);
}
*/

// sync files via callback, better imo
var fs = require('fs');
var Q = require('q');
process.chdir('recipes');
var concat = '';
var filenames = fs.readdirSync('.');

function asyncFilter(arr, filterfn, callback){
	var promises = []
	arr.forEach(function(val){
		promises.push(Q.nfcall(filterfn, val))
	});
	Q.all(promises).then(function(filterArr){
		console.log(filterArr)
		var filtered = [];
		arr.filter(function(v,i){
			return filteredArr(i);
		});
		callback(null, filtered);
	},function(err){
		callback(err);
	});
}

function filterFn(filename){
	fs.stat(filename, function(err, stat){
		if(stat.isFile())
			return true;
		else
			return false;
	})
};

asyncFilter(filenames, filterFn, function(filtered){
	console.log(filtered)
	function concatFile(index) {
		fs.readFile(filtered[index], 'utf8', function (err, text) {
			if(err)
				throw err;
			concat += text;
			if (index < filtered.length - 1)
				concatFile(index + 1)
			else
				console.log(concat);
		});
	};
concatFile(0);

})





