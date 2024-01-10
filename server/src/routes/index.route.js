const express = require('express');
const taskRoutes = require('./APIs/task.route');
const userRoutes = require('./APIs/user.route');
const authRoutes = require('./APIs/auth.route');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.use('/', authRoutes);

router.use(authController.putLastActivity);

router.use('/tasks', taskRoutes);
router.use('/users', userRoutes);

module.exports = router;
