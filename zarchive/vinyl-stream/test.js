
var stream = require('stream'),
	Duplex = stream.Duplex,
	Readable = stream.Readable,
	Writable = stream.Writable,
	Transform = stream.Transform,
	assert = require('assert')

var dup = new Duplex();
dup.arr = [];
dup._read = function(){
	if(this.arr.length == 0) {
		assert(!this.pending)// we shouldn't receive another read until we push
		this.pending = true;
	}

	else
		this.push(this.arr.shift())
}
dup._write = function(chunk, enc, cb) {
	console.log('tap', chunk.toString())
	this.arr.push(chunk);
	if(this.pending) {
		this.pending = false;
		this._read();
	}
	//this.push(chunk); // just pass through and skip _read
	cb()
}

var dup2 = new Duplex();
dup2.on('error', function(err) { console.error(err)})
dup2._read = function(){ console.log('read')} // get an error if you don't implement _read
dup2._write = function(chunk, enc, cb) {
	console.log('dup2', chunk.toString())
	this.push(chunk); cb(); // this way or this way:
	//cb(null, chunk)
}

var trans = new Transform();
trans.on('error', function(err) { console.error(err)})
//trans._read // DON'T implement read, it messes it up
trans._transform = function(chunk, enc, cb) {
	console.log('trans', chunk.toString())
	this.push(chunk);
	cb();
}

var write = new Writable();
write._write = function(chunk, enc, cb) {
	console.log('write', chunk.toString())
	cb()
}



var read = new Readable();

read.push('one');
read.push('two');
read.push(null);
read.pipe(dup2).pipe(write)


/*
write.write('some text'); // can just call read.push() and write.write() to put data through either
write.end('bye') // call end when there's no more data
*/

/*
dup.write('duplex text')
dup.end()
dup.pipe(write)
*/
