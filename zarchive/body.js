
module.exports = function(req){


	function read(fn){
		var body = ''
	// we want to get the data as utf8 strings
	// If you don't set an encoding, then you'll get Buffer objects
		req.setEncoding('utf8');

	// Readable streams emit 'data' events once a listener is added
		req.on('data', function (chunk) {
			body += chunk
		})

	// the end event tells you that you have entire body
		req.on('end', function () {
			fn(null, body)
		});

	}

	function readJSON(fn){
		try{
			read(function(err, data){
				if(err)
					fn(err)
				else
					fn(null, JSON.parse(data))
			});
		}
		catch(e){
			fn(e)
		}
	}

	function readText(fn){
		try{
			read(function(err, data){
				if(err)
					fn(err)
				else
					fn(null, data)
			});
		}
		catch(e){
			fn(e)
		}
	}

	return {
		readJSON: readJSON,
		readText: readText
	};

};

