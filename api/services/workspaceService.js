const Workspace = require('../models/workspace'); 
const {User} = require('../models/user');  
const Task = require('../models/task');


async function getAllWorkspaceEmployees(workspaceID) {
    
    const workspace = await Workspace.findById(workspaceID);
    
    if (!workspace) {
      throw new Error('WorkspaceNotFound');
    }

    // find all users with the IDs found in the workspace's employees array
    const users = await User.find({ 
      _id: { $in: workspace.employees }
    }).select('_id firstName lastName email'); 
    console.log(users)

    return users; 
}

async function getAllWorkspaces() { 

    const workspaces = await Workspace.find({}).lean(); 
    const workspacesWithUserData = [];
    
    for (const workspace of workspaces) {
        const workspaceWithUserData = {
            _id: workspace._id,
            adminData: {},
            employeesData: []
        };
     
        const admin = await User.findById(workspace.admin).select('id firstName lastName email').lean(); 
        workspaceWithUserData.adminData = admin;
     
        for (const employeeId of workspace.employees) {
            const employee = await User.findById(employeeId).select('firstName lastName email').lean();
            workspaceWithUserData.employeesData.push(employee);
        }
    
        workspacesWithUserData.push(workspaceWithUserData);
    }
    
    console.log(workspacesWithUserData);
    return workspacesWithUserData;
}

async function getOtherWorkspaceEmployees(workspaceID, userID) {
    
    const user = await User.findById(userID);

    if (!user)
        throw error('InvalidUser');

    const workspace = await Workspace.findById(workspaceID);
    if (!workspace) {
        throw new Error('WorkspaceNotFound');
    }

    const users = await User.find({ 
        _id: { 
          $in: workspace.employees, 
          $ne: userID 
        }
    }).select('_id firstName lastName email');
           
    return users;
}

async function removeUserFromWorkspace(workspaceID, userID) {
    const workspace = await Workspace.findOne({_id: workspaceID});
 
    const user = await User.findById(userID);

    if (!workspace)
        throw new Error('InvalidWorkspace');

    if (!user)
        throw error('InvalidUser');

    await Workspace.updateOne({ _id: workspaceID }, { $pull:  { employees: userID } });

    await User.findByIdAndUpdate(userID, {workspaceID: null});
    
    await Task.updateMany(
        { assignees: userID },
        { $pull: { assignees: userID } }
      );

}

const workspaceService = {
    getAllWorkspaceEmployees,
    getAllWorkspaces,
    getOtherWorkspaceEmployees,
    removeUserFromWorkspace
}

module.exports = workspaceService;
