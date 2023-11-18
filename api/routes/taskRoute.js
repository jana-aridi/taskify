const express = require('express');
const authenticateToken = require('./middleware');
const taskController = require('../controllers/taskController');
const router = express.Router();

router.post('/add', authenticateToken, taskController.createTaskController);

router.post('/update/:taskID', authenticateToken, taskController.updateTaskController);

router.delete('/delete/:taskID', authenticateToken, taskController.deleteTaskController);

router.post('/addSubtask/:taskID', authenticateToken, taskController.createSubtaskController);

router.post('/updateSubtask/:taskID', authenticateToken, taskController.updateSubtaskController);

module.exports = router;

