
var Readable = require('stream').Readable,
	fs = require('fs'),
	util = require('util'),
	glob = require('glob'),
	async = require('async'),
	_ = require('lodash'),
	tap = require('./tap')

function Src(globStr) {
	if(!(this instanceof Src))
		return new Src(globStr);
	Readable.call(this, {objectMode: true});
	this.globStr = globStr;
	this.index = 0;
}
util.inherits(Src, Readable);


Src.prototype.getVinylObj = function getVinylObj(file, cb) {
	var obj = {}
	fs.readFile(file, function(err, buf) {
		obj.name = file;
		obj.contents = buf.toString();
	})
}

Src.prototype.readStart = function() {
	var self = this;
	glob(this.globStr, function (err, files) {
		if (err) return console.error(err)
		async.filter(files, function (file, cb) {
			fs.stat(file, function (err, stat) {
				if (err || stat.isDirectory())
					cb(false)
				else
					cb(true);
			})
		}, function (filesOnly) {
			self.fileArr = filesOnly;
			self._read()
		})
	})
}

var pushempty = _.throttle(function() { console.log('pushempty'); }, 500)

// read calls wait for the push, don't give them one until you have it. On init, you get your
// fileArr, then when you have it, call _read again as that code will push for that initial read
Src.prototype._read = function() {
	var self = this;
	if(!this.readStarted) {
		this.readStarted = true;
		this.readStart();
	}

	if( this.fileArr &&  (this.fileArr.length == 0 || (this.index == this.fileArr.length)))
		return this.push(null)
	else if(this.fileArr) {
		var file = this.fileArr[this.index++];
		var obj = {name: file}
		fs.readFile(file, function (err, buf) {
			if (err) throw err;
			obj.contents = buf.toString();
			console.log('push', obj.name)
			self.push(JSON.stringify(obj));
		})
	}
}

Src('*')
	.pipe(tap(function(obj){
	console.log('\ntapped', obj.name, '>>>>>', obj.contents.replace('\n', '').slice(0, 20), '\n')
	return obj;
})).pipe(process.stdout)