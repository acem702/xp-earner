const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/user.model');
const AppError = require('../utils/AppError.util');
const catchAsync = require('../utils/catchAsync.util');
const config = require('../config/env.config');

const signToken = (id) =>
    jwt.sign({ id }, config.jwtSecret, {
        expiresIn: '10d',
    });

// *** create a token and send it to the user *** \\
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    const cookieOption = {
        // *** convert days to milliseconds => 10 days *** \\
        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    if (config.nodeEnv === 'production') cookieOption.secure = true;

    res.cookie('JWT', token, cookieOption);

    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
};

// *** signup user *** \\
exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    createSendToken(newUser, 201, res);
});

// *** login user *** \\
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if user send email and password
    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    // Check if user exist and password is correct
    const user = await User.findOne({
        email: email,
    }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    // check if user is inactive 1 month ago, then make xp_points = 0 and completed_tasks = []
    if (user.logoutAt <= Date.now() - 30 * 24 * 60 * 60 * 1000) {
        user.xp_points = 0;
        user.completed_tasks = [];
        user.save({ validateBeforeSave: false });
    }

    createSendToken(user, 200, res);
});

// *** protect routes *** \\
exports.protect = catchAsync(async (req, res, next) => {
    // +[1] get the token and check if it's there
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.JWT) {
        token = req.cookies.JWT;
    }

    if (!token) {
        return next(
            new AppError('You are not logged in! Please log in to get access'),
            401,
        );
    }

    // +[2] Verification token
    const decoded = await promisify(jwt.verify)(token, config.jwtSecret);

    // +[3] Check if user still exist
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
        return next(
            new AppError(
                'The user belonging to this token does no longer exist',
                401,
            ),
        );
    }
    // +[4] Check if user changed password after the token was issued
    if (freshUser.passwordChangedAfter(decoded.iat)) {
        return next(
            new AppError(
                'User recently changed password! Please login again',
                401,
            ),
        );
    }

    req.user = freshUser;
    res.locals.user = freshUser;
    next();
});

// *** update password *** \\
exports.updatePassword = catchAsync(async (req, res, next) => {
    // +[1] Get user from collection
    const user = await User.findById(req.user.id).select('+password');

    // +[2] Check if POSTed current password is correct
    if (
        !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
        return next(new AppError('Your current password is incorrect', 401));
    }

    // +[3] If so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    // +[4] Log user in, send JWT token
    createSendToken(user, 200, res);
});

// *** logout user ***
exports.logout = catchAsync(async (req, res, next) => {
    // set user.logoutAt = Date.now()

    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.JWT) {
        token = req.cookies.JWT;
    }

    if (!token) {
        return next(new AppError('You are not logged in to logout!'), 401);
    }

    // +[2] Verification token
    const decoded = await promisify(jwt.verify)(token, config.jwtSecret);

    const user = await User.findById(decoded.id);
    user.logoutAt = Date.now();
    await user.save({ validateBeforeSave: false });

    res.cookie('JWT', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });

    res.status(200).json({ status: 'success' });
});
