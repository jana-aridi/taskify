const express = require('express');
const router = express.Router();
const authenticateToken = require('./middleware');
const workspaceController = require('../controllers/workspaceController');
  

router.get('/:workspaceID/users', authenticateToken, workspaceController.getAllWorkspaceEmployeesController);

router.get('/:workspaceID/:userID/otherUsers', authenticateToken, workspaceController.getOtherWorkspaceEmployeesController);

router.get('', authenticateToken, workspaceController.getAllWorkspacesController);

router.delete('/:workspaceID/:userID', authenticateToken, workspaceController.removeUserFromWorkspaceController);
 
module.exports = router;