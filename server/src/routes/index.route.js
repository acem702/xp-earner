const express = require('express');
const taskRoutes = require('./APIs/task.route');
const userRoutes = require('./APIs/user.route');
const authRoutes = require('./APIs/auth.route');
const authController = require('../controllers/auth.controller');
const User = require('../models/user.model');
const moment = require('moment');
const router = express.Router();

// Helper function to get random points
const getRandomPoints = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

router.use('/', authRoutes);

router.use(authController.putLastActivity);

router.use('/tasks', taskRoutes);
router.use('/users', userRoutes);

// Daily reward endpoint
router.post('/claim-daily-reward', authController.protect, async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findById(userId);
        const now = moment();
        let nextDailyClaim = moment().startOf('day').add(1, 'day');

        if (!user.lastDailyClaim || now.diff(moment(user.lastDailyClaim), 'days') >= 1) {
            const points = getRandomPoints(10000, 20000);
            user.xp_points += points;
            user.lastDailyClaim = now.startOf('day').toDate(); // Set to start of current day
            await user.save({ validateBeforeSave: false });
        } else {
            nextDailyClaim = moment(user.lastDailyClaim).startOf('day').add(1, 'day');
        }

        return res.json({ success: true, nextDailyClaim, points });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// 12-hour reward endpoint
router.post('/claim-12hour-reward', authController.protect, async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findById(userId);
        const now = moment();
        let next12HourClaim = moment().add(12, 'hours');

        if (!user.last12HourClaim || now.diff(moment(user.last12HourClaim), 'hours') >= 12) {
            const points = getRandomPoints(10000, 20000);
            user.xp_points += points;
            user.last12HourClaim = now.toDate();
            await user.save({ validateBeforeSave: false });
        } else {
            next12HourClaim = moment(user.last12HourClaim).add(12, 'hours');
        }

        return res.json({ success: true, next12HourClaim, points });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
