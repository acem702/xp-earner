const Task = require('../models/task.model');
const AppError = require('../utils/AppError.util');
const catchAsyncUtil = require('../utils/catchAsync.util');
const factory = require('./handlerFactory');

exports.getAllTasks = factory.getAll(Task);

exports.getTask = catchAsyncUtil(async (req, res, next) => {
    const { slug } = req.params;

    const task = await Task.findOne({ slug });

    if (!task) {
        return next(new AppError('No task found with that slug', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: task,
        },
    });
});

exports.createTask = factory.createOne(Task);
