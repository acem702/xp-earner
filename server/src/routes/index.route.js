const express = require('express');
const taskRoutes = require('./APIs/task.route');
const userRoutes = require('./APIs/user.route');
const authRoutes = require('./APIs/auth.route');
const authController = require('../controllers/auth.controller');
const User = require('../models/user.model');
const UserData = require('../models/userData.model');
const Referral = require('../models/referral.model');
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
    let points = 0;
    try {
        const user = await User.findById(userId);
        const now = moment();
        let nextDailyClaim = moment().startOf('day').add(1, 'day');

        if (!user.lastDailyClaim || now.diff(moment(user.lastDailyClaim), 'days') >= 1) {
            points = getRandomPoints(10000, 20000);
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
    let points = 0;
    try {
        const user = await User.findById(userId);
        const now = moment();
        let next12HourClaim = moment().add(12, 'hours');

        if (!user.last12HourClaim || now.diff(moment(user.last12HourClaim), 'hours') >= 12) {
            points = 20000;
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

// Endpoint to get user balance and referral count
router.get('/user-stats/:userId', authController.protect, async (req, res) => {
    const userId = req.params.userId;

    try {
        // Fetch user's balance from the userData collection
        const userData = await UserData.findOne({ userId });
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found in userData collection" });
        }
        const userBalance = userData.balance;

        // Count the number of referrals where referralId matches the user's userId
        const referralCount = await Referral.countDocuments({ referralId: userId });

        // Respond with the balance and referral count
        return res.json({
            success: true,
            balance: userBalance,
            referralCount: referralCount
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
