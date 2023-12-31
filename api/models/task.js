const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const SubtaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
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

    assignees: [{ type: Schema.Types.ObjectId, ref: 'user'}],
        
    isCompleted: {
        type: Boolean, 
        default: false,
    },

    dueDate: {
        type: String,
        default: null,
    },
    
    workspaceID: {
        type: String, 
        ref: 'workspace'
    },

    subtasks: [SubtaskSchema] 
});

const Task = mongoose.model("task", taskSchema);
module.exports = Task;