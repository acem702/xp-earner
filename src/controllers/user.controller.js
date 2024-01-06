const factory = require('./handlerFactory');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync.util');

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User, { path: 'tasks' });

// *** not create with factory to customize what can be created ***
exports.createUser = catchAsync(async (req, res, next) => {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    res.status(201).json({
        status: 'success',
        data: {
            data: user,
        },
    });
});
