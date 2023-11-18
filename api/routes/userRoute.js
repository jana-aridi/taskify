const express = require('express');
const router = express.Router();
const authenticateToken = require('./middleware');
const userController = require('../controllers/userController');
  
router.post('/login', userController.loginUserController);
 
router.post('/register', userController.createUserController);

router.post('/users/joinWorkspace/:userID', authenticateToken, userController.joinWorkspaceController);
 
module.exports = router;