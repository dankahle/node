var _ = require('lodash');

var users = [
	{
		id: 1,
		name: 'dank',
		age: 50,
		messages: [
			{id: 10, message: 'one cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.'},
			{id: 11, message: 'two cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.'}
		]

	},
	{
		id: 2,
		name: 'carl',
		age: 60,
		messages: [
			{id: 12, message: 'one cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.'},
			{id: 13, message: 'two cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.'}
		]

	}
]

/////////////// users

/*
exports.getUsers = function () {
	return _.clone(users, true).map(function(v){
		v.messages = undefined;
		return v;
	});
};

var getOne = function (id) {
	return _.find(_.clone(users, true), function (v) {
		return v.id == id;
	});
};
*/

function getNextUserId() {
	return _.max(_.pluck(users, 'id')) + 1;
}

function getNextMessageId() {
	return _.max(_.pluck(_.flatten(_.pluck(users, 'messages')), 'id')) + 1;
}

exports.getUsers = function() {
	return users;
}

exports.getOneUser = getOneUser = function(id){
	return _.find(users, {id: Number(id)});
}

exports.add = function(user) {
	user.id = getNextUserId();
	users.push(user);
	return user;
}

exports.update = function(user) {
	var _user = getOneUser(user.id);
	if(!_user)
		return {count: 0};
	users[users.indexOf(_user)] = user;
	return {count: 1};
}

exports.remove = function(id) {
	var user = getOneUser(id);
	if(!user)
		return {count: 0};
	_.pull(users, user);
	return {count: 1};
}

/////////////////// user/id/messages

exports.getMessages = function (id) {
	return getOneUser(id).messages;
}

exports.getOneMessage = getOneMessage = function (userId, messageId) {
	return _.find(getOneUser(userId).messages, {id: Number(messageId)});
}

exports.addMessage = function(userId, message) {
	message.id = getNextMessageId();
	var user = getOneUser(userId);
	if(!user.messages)
		user.messages  = [];
	user.messages.push(message);
	return message;
}

exports.updateMessage = function(userId, message) {
	var user = getOneUser(userId);
	var _message = getOneMessage(userId, message.id);
	if(!_message)
		return {count: 0};
	user.messages[user.messages.indexOf(_message)] = message;
	return {count: 1};
}

exports.removeMessage = function(userId, messageId) {
	var user = getOneUser(userId);
	var message = getOneMessage(userId, messageId);
	if(!message)
		return {count: 0};
	_.pull(user.messages, message);
	return {count: 1};
}

