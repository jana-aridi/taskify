const mongoose = require('mongoose'); 

const SubtaskSchema = new mongoose.Schema({
    name: String, 
    isCompleted: {
        type: Boolean,
        default: false,
    }
});

const taskSchema = new mongoose.Schema({
    name: {
        type: String, 
        default: "New Task",
    },

    assignees: [{ type: Schema.Types.ObjectId, ref: 'User'}],
        
    isCompleted: {
        type: Boolean, 
        default: false,
    },
    
    workspaceID: {
        type: Schema.Types.ObjectId, ref: 'Workspace'
    },

    subtasks: [SubtaskSchema] 
});

const Task = mongoose.model("task", taskSchema);
module.exports = Task;