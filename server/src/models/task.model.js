const mongoose = require('mongoose');
const slugify = require('slugify');

const taskSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A task must have a name'],
            trim: true,
            maxlength: [255, 'The name must be at least 255 characters'],
        },
        description: {
            type: String,
            required: [true, 'A task must have a description'],
            trim: true,
        },
        links: [String],
        xp_points: {
            type: Number,
            required: [true, 'A task must have a xp'],
            min: [0, 'The xp must be at least 0'],
        },
        slug: String,
    },
    { timestamps: true },
);

// make slug index
taskSchema.index({ slug: 1 });

// middleware to create a slug
taskSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
