const express = require('express');
const taskRoutes = require('./APIs/task.route');
const userRoutes = require('./APIs/user.route');
const authRoutes = require('./APIs/auth.route');

const router = express.Router();

router.use('/tasks', taskRoutes);
router.use('/users', userRoutes);
router.use('/', authRoutes);

module.exports = router;
