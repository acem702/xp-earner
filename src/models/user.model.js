const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Task = require('./task.model');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name'],
        trim: true,
        maxlength: [255, 'The name must be at least 255 characters'],
    },
    email: {
        type: String,
        required: [true, 'A user must have a email'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.default.isEmail, 'You should enter a valid email'],
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, 'Please provide your a password'],
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords are not the same',
        },
    },
    passwordChangedAt: Date,
    logoutAt: Date,
    // tasks completed and xp points
    completed_tasks: [
        {
            task_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Task',
            },
        },
    ],
    xp_points: {
        type: Number,
        default: 0,
    },
});

// calculate the xp points
userSchema.pre('save', async function (next) {
    if (!this.isModified('completed_tasks')) return next();

    const tasks = await Task.find({ _id: this.completed_tasks });

    this.xp_points += tasks.xp_points;
    next();
});

// pre-save middleware to encrypt the password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
    next();
});

//pre-save middleware to update the passwordChangedAt property
userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

// method to compare the password with the encrypted password in the database
userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword,
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

// method to check if the user changed the password after the token was issued
userSchema.methods.passwordChangedAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10,
        );
        return JWTTimestamp < changedTimestamp;
    }

    return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
