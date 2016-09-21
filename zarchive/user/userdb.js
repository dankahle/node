
var mongoose = require('mongoose');


var db = mongoose.createConnection('mongodb://localhost:27017/db')
db.on('error', function(err) {
	console.error(err);
})

var userSchema = mongoose.Schema({
	name: String,
	age: Number,
	messages: [{message: String}]
});
var User = db.model('User', userSchema);

var users = [
	{
		name: 'dank',
		age: 50,
		messages: [
			{message: 'dank one cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.'},
			{message: 'dank two cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.'}
		]

	},
	{
		name: 'carl',
		age: 60,
		messages: [
			{message: 'carl one cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.'},
			{message: 'carl two cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.'}
		]

	}
];

/*
User.remove({}, function(err) {
	if(err) return console.error(err);

	User.create(users, function(err) {
		if(err)
			return console.error(err);
	})
})
*/


module.exports = User;
