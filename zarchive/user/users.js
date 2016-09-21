var _ = require('lodash');

var _users = [
	{
		id: 1,
		name: 'dank1',
		age: 50,
		messages: [
			{id: 10, message: 'message one'},
			{id: 11, message: 'message two'}
		]

	},
	{
		id: 2,
		name: 'carl1',
		age: 60,
		messages: [
			{id: 12, message: 'message one'},
			{id: 13, message: 'message two'}
		]

	}
]

var getUsers = function () {
	return _.clone(_users, true).map(function(v){
		v.messages = undefined;
		return v;
	});
};

var _getUser = function (id) {
	return _.find(_.clone(_users, true), function (v) {
		return v.id == id;
	});
};

var getUser = function(id){
	var user = _getUser(id);
	user.messages = undefined;
	return user;
}

var getMessages = function (id) {
	return _getUser(id).messages;
}

var getMessage = function (userId, messageId) {
	return _.find(_getUser(userId).messages, function (v) {
		return v.id == messageId;
	});
}


module.exports = {
	getUsers: getUsers,
	getUser: getUser,
	getMessages: getMessages,
	getMessage: getMessage
}