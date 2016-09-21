
var mongoose = require('mongoose'),
	_ = require('lodash'),
	//User = require('./userdb')
	User = require('./userdb-tabledata');


exports.getUsers = function(params, cb) {
	var query = User.find().select('-created -sport -__v').lean();
	if(params.name) query = query.where('name').equals(params.name);
	if(params.minAge) query = query.where('age').gte(params.minAge)
	if(params.sort) query = query.sort(params.sort);

	query.exec(function(err, users) {
		cb(err, err? null: users.map(function(v,i) {
			v.rownum = i + 1;
			return v;
		}));
	});
};

exports.getUsersPage = function(pageNo, pageSize, sort, cb) {
	var opts =  {
		columns: '-created -sport -__v',
		lean: true
	};
	if(sort)
		opts.sortBy = sort;
	User.paginate({}, pageNo, pageSize,
		function(err, pageCount, data, numRecords) {
			var users = data.map(function(v,i) {
				v.rownum = (pageNo * pageSize - pageSize) + 1 + i;
				return v;
			})
			cb(err, err? null: {numRecords: numRecords, data: users});
	}, opts);
};

var getOneUser = function(id, cb){
	User.findById(id).exec(function(err, user) {
		if(err) return cb(err);
		if(!user) return cb(new Error('User not found'));
		cb(null, user);
	});
};

exports.getOneUser = function(id, cb) {
	getOneUser(id, function(err, user) {
		cb(err, !err? user.toObject(): undefined);
	})
};

exports.add = function(user, cb) {
	new User(user).save(cb);
};

exports.update = function(user, cb) {
	getOneUser(user._id, function(err, doc) {
		if(err) return cb(err);
		_.extend(doc, user);
		doc.save(cb);// numAffected
	})
};

exports.remove = function(userId, cb) {
	getOneUser(userId, function(err, doc) {
		if(err) return cb(err);
		doc.remove(cb);// removed user
	})
};


/////////////////// user/id/messages

exports.getMessages = function (userId, cb) {
	getOneUser(userId, function(err, user) {
		cb(err, user? user.messages: undefined);
	})
};

var getOneMessage;
exports.getOneMessage = getOneMessage = function (userId, messageId, cb) {
	getOneUser(userId, function(err, user) {
		if(err) return cb(err);
		var message = _.find(user.messages, {id: messageId});
		cb(null, message);
	});
};

exports.addMessage = function(userId, message, cb) {
	getOneUser(userId, function(err, user) {
		user.messages.push(message);
		user.save(function(err, userSave) {
			cb(err, !err? _.last(userSave.messages): undefined);
		})
	})
};

exports.updateMessage = function(userId, message, cb) {
	getOneUser(userId, function (err, user) {
		_.extend(_.find(user.messages, {id: message._id}), message);
		user.save(cb); // numAffected
	});
};

exports.removeMessage = function(userId, messageId, cb) {
	getOneUser(userId, function (err, user) {
		var message = _.find(user.messages, {id: messageId}).toObject();
		user.messages.remove({id: messageId});
		user.save(function(err, userSave) {
			cb(err, !err? message: undefined);
		})
	});
};

