const express = require('express');
const authenticateToken = require('./middleware');
const taskController = require('../controllers/taskController');
const router = express.Router();

router.post('/add', taskController.createTaskController);

router.post('/update', taskController.updateTaskController);

router.delete('/', taskController.deleteTaskController);

router.post('/addSubtask', taskController.createSubtaskController);
router.post('/updateSubtask', taskController.updateSubtaskController);

module.exports = router;

