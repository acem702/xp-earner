const express = require('express');
const taskController = require('../../controllers/task.controller');

const router = express.Router();

router
    .route('/')
    .get(taskController.getAllTasks)
    .post(taskController.createTask);

router.route('/:slug').get(taskController.getTask);

module.exports = router;
