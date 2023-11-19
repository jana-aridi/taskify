const workspaceService = require('../services/workspaceService');

const getAllWorkspaceEmployeesController = async(req, res) => {

    try {
        
        const { workspaceID } = req.params;
        const employees = await workspaceService.getAllWorkspaceEmployees(workspaceID);
        res.json(employees);
    
    } catch (error) {

        res.status(500).send({ message: error.message });

    }
}

const getAllWorkspacesController = async(req, res) => {

    try {
        
        const workspaces = await workspaceService.getAllWorkspaces();
        res.json(workspaces);
    
    } catch (error) {

        res.status(500).send({ message: error.message });

    }

}

const getAllOtherWorkspaceEmployeesController = async(req, res) => {

    try {
        const workspaceID = req.params.workspaceID;
        const userID = req.params.userID;
        const employees = await workspaceService.getAllOtherWorkspaceEmployees(workspaceID, userID);
        res.json(employees);
    
    } catch (error) {

        res.status(500).send({ message: error.message });

    }

}

const workspaceController = {
    getAllWorkspaceEmployeesController,
    getAllWorkspacesController,
    getAllOtherWorkspaceEmployeesController
}

module.exports = workspaceController;