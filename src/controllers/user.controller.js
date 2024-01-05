const factory = require('./handlerFactory');
const User = require('../models/user.model');

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User, { path: 'tasks' });
exports.createUser = factory.createOne(User);
