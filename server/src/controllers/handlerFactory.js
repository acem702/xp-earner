const AppError = require('../utils/AppError.util');
const catchAsync = require('../utils/catchAsync.util');

exports.getAll = (Model) =>
    catchAsync(async (req, res, next) => {
        const docs = await Model.find();

        res.status(200).json({
            status: 'success',
            results: docs.length,
            data: {
                data: docs,
            },
        });
    });

exports.getOne = (Model, popOptions) =>
    catchAsync(async (req, res, next) => {
        let query = Model.findById(req.params.id);
        if (popOptions) query = query.populate(popOptions);
        const doc = await query;

        if (!doc) {
            return next(new AppError('No document found with that ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: doc,
            },
        });
    });

exports.createOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                data: doc,
            },
        });
    });

exports.updateOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const { id } = req.params;

        const doc = await Model.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!doc)
            return next(new AppError('No document found with that ID', 404));

        res.status(200).json({
            status: 'success',
            data: {
                data: doc,
            },
        });
    });
