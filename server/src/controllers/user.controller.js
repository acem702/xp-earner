const factory = require('./handlerFactory');
const User = require('../models/user.model');
const Task = require('../models/task.model');
const catchAsync = require('../utils/catchAsync.util');
const AppError = require('../utils/AppError.util');

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

// *** get me *** \\
exports.getMe = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).populate('tasks');

    res.status(200).json({
        status: 'success',
        data: {
            data: user,
        },
    });
});

// *** user complete a task ***
exports.completeTask = catchAsync(async (req, res, next) => {
    // [1] get task id from req.params
    const { taskId } = req.params;
    // [2] get user id from req.user
    const userId = req.user.id;

    // [3] find task info by id
    const task = await Task.findById(taskId);

    // [4] check if the user completed the task before

    const user = await User.findById(userId);

    const taskExist = user.completed_tasks.some(
        (el) => el.task_id._id.toString() === taskId.toString(),
    );

    if (taskExist) {
        return next(new AppError('You already completed this task', 400));
    }

    // [5] if not completed before, add task to user.completed_tasks and increase xp_points
    user.completed_tasks.push({
        task_id: taskId,
    });

    user.xp_points += task.xp_points;

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        status: 'success',
        data: {
            data: user,
        },
    });
});
