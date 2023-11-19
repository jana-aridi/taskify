const express = require('express');
const router = express.Router();
const authenticateToken = require('./middleware');
const userController = require('../controllers/userController');
  
router.post('/login', userController.loginUserController);
 
router.post('/register', userController.createUserController);

router.delete('/users/:userID', authenticateToken, userController.deleteUserController);

router.post('/users/joinWorkspace/:userID', authenticateToken, userController.joinWorkspaceController);
 
router.get('/users/getTasks/:userID', authenticateToken, userController.getUserTasksController);

module.exports = router;