
var stream = require('stream'),
	Duplex = stream.Duplex,
	Readable = stream.Readable,
	Writable = stream.Writable,
	Transform = stream.Transform,
	assert = require('assert')


var dup = new Duplex({writableObjectMode: true, readableObjectMode: false});
dup.on('error', function(err) { console.error('dup', err); })
dup._read = function(){} // get an error if you don't implement _read
dup._write = function(chunk, enc, cb) {
	//var obj = JSON.parse(chunk.toString())
	console.log('dup', chunk)
	this.push(chunk)
	cb()
}

var write = new Writable({objectMode: true});
write.on('error', function(err) { console.error('write', err); })
write._write = function(chunk, enc, cb) {
	//var obj = JSON.parse(chunk.toString())
	console.log('write', chunk)
	cb()
}

dup.write({name: 'carl'})


/*
var read = new Readable({objectMode: false});
read.on('error', function(err) { console.error('read', err); })

read.push(JSON.stringify({name: 'dank', age: 50}));
read.push(null);
read.pipe(dup).pipe(write)
*/


/*
 write.write('some text'); // can just call read.push() and write.write() to put data through either
 write.end('bye') // call end when there's no more data
 */

/*
 dup.write('duplex text')
 dup.end()
 dup.pipe(write)
 */
