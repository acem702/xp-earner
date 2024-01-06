const express = require('express');
const userController = require('../../controllers/user.controller');
const authController = require('../../controllers/auth.controller');

const router = express.Router();

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router.get('/me', authController.protect, userController.getMe);
router.route('/:id').get(userController.getUser);

// *** get me *** \\

// *** user complete a task ***
router.patch(
    '/complete-task/:taskId',
    authController.protect,
    userController.completeTask,
);

module.exports = router;
