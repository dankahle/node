var Duplex = require('stream').Duplex,
	_ = require('lodash')


var Tap = function (tapfcn) {
	if(!(this instanceof Tap))
		return new Tap(tapfcn)
	Duplex.call(this, {
		readableObjectMode: true,
		writableObjectMode: true
	});
	this.tapfcn = tapfcn;
	this.on('error', function(err) {
		console.log('taperr', err)
	})
}
Tap.prototype = Object.create(Duplex.prototype);
Tap.prototype.constructor = Tap;

var mixin = {
	arr: [],
	_read: function () {
	},
	_write: function (buf, enc, cb) {
		if(buf == null) {
			console.log('writezero')
			return;
		}
		var obj = JSON.parse(buf.toString());
		var tap = this.tapfcn(obj);
		this.push(JSON.stringify(tap))
		cb()
	}
}
_.extend(Tap.prototype, mixin);

module.exports = Tap;