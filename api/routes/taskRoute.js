const express = require('express');
const authenticateToken = require('./middleware');
const taskController = require('../controllers/taskController');
const router = express.Router();

router.post('/add', taskController.createTaskController, authenticateToken);

router.post('/update/:taskID', taskController.updateTaskController, authenticateToken);

router.delete('/delete/:taskID', taskController.deleteTaskController, authenticateToken,);

router.post('/addSubtask/:taskID', taskController.createSubtaskController, authenticateToken);

router.post('/updateSubtask/:taskID', taskController.updateSubtaskController, authenticateToken);

module.exports = router;

