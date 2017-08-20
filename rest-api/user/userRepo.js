var _ = require('lodash');

var users = [
  {id: 1, name: 'dank', age: 50},
  {id: 2, name: 'carl', age: 60},
  {id: 3, name: 'jim', age: 40},
]

exports.getAll = function() {
	return users;
}

exports.getOne = function(id){
	return getOneUser(id);
}

exports.add = function(user) {
	user.id = getNextUserId();
	users.push(user);
	return user;
}

exports.update = function(id, body) {
  const user = getOneUser(id);
  if (user) {
    return _.merge(user, body);
  } else {
    return;
  }
}

exports.remove = function(id) {
	var user = getOneUser(id);
	if(!user)
		return {count: 0};
	_.pull(users, user);
	return {count: 1};
}

function getNextUserId() {
  return _.max(_.map(users, 'id')) + 1;
}

function getOneUser(id) {
  return _.find(users, {id: Number(id)});
}

