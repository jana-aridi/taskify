const express = require('express');
const authenticateToken = require('./middleware');
const taskController = require('../controllers/taskController');
const router = express.Router();

router.post('/add', taskController.createTaskController);

router.post('/update/:taskID', taskController.updateTaskController);

router.delete('/delete/:taskID', taskController.deleteTaskController);

router.post('/addSubtask/:taskID', taskController.createSubtaskController);
router.post('/updateSubtask/:taskID', taskController.updateSubtaskController);

module.exports = router;

