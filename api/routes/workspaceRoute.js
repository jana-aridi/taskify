const express = require('express');
const router = express.Router();
const authenticateToken = require('./middleware');
const workspaceController = require('../controllers/workspaceController');
  

router.get('/:workspaceID/users', authenticateToken, workspaceController.getAllWorkspaceEmployeesController);

router.get('', authenticateToken, workspaceController.getAllWorkspacesController);
 
module.exports = router;