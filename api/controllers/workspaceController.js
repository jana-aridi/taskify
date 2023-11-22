const workspaceService = require('../services/workspaceService');

const getAllWorkspaceEmployeesController = async(req, res) => {

    try {
        
        const workspaceID = req.params.workspaceID; 
        const employees = await workspaceService.getAllWorkspaceEmployees(workspaceID);
        res.json(employees); 
    
    } catch (error) {
        console.log(error)
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

const getOtherWorkspaceEmployeesController = async(req, res) => {

    try {
        const workspaceID = req.params.workspaceID;
        const userID = req.params.userID;
        const employees = await workspaceService.getOtherWorkspaceEmployees(workspaceID, userID);
        res.json(employees);
    
    } catch (error) {

        res.status(500).send({ message: error.message });

    }

}

const removeUserFromWorkspaceController = async(req, res) => {
    try {

        console.log(req.params)

        const workspaceID = req.params.workspaceID;
        console.log(workspaceID);

        const userID = req.params.userID;

        await workspaceService.removeUserFromWorkspace(workspaceID, userID);

        res.status(200).send({message: 'Removed successfully!'})

    } catch(error) {

        console.log(error);

        if (error.message === 'InvalidUser')
            res.status(500).send({message: "User not found!"});

        else if(error.message === 'InvalidWorkspace')
            res.status(500).send({message: "Workspace not found!"});

        else
            res.status(500).send({message: "Internal Server Error: " + error});
        
    }
}

const workspaceController = {
    getAllWorkspaceEmployeesController,
    getAllWorkspacesController,
    getOtherWorkspaceEmployeesController,
    removeUserFromWorkspaceController
}

module.exports = workspaceController;