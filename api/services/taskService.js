const Task = require('../models/tasks');
const mongoose = require('mongoose')


async function getAllUserTasks(userID) {

    if (!mongoose.Types.ObjectId.isValid(userID)) {
        throw new Error('InvalidUserID');
    }

    const objectId = mongoose.Types.ObjectId(userID);
    const tasks = await Task.find({ assignees: objectId });

    return tasks;
}


async function createTask(taskData) {
    if (!taskData || Object.keys(taskData).length === 0) {
        throw new Error('TaskDataRequired');
    }

    const task = new Task(taskData);
    const savedTask = await task.save();

    if (!savedTask) {
        throw new Error('TaskCreationFailed');
    }

    return savedTask;
}

async function updateTask(taskID, taskData) {

    if (!taskData || Object.keys(taskData).length === 0) {
        throw new Error('TaskUpdateDataRequired');
    }
    console.log('task data '+ taskData) 
    console.log(taskID)
    if (!taskID || !mongoose.Types.ObjectId.isValid(taskID)) {
        throw new Error('InvalidTaskID');
    }
 
    const updatedTask = await Task.findByIdAndUpdate(taskID, taskData, { new: true });

    if (!updatedTask) {
        throw new Error('TaskUpdateFailed');
    }

    return updatedTask;
}

async function deleteTask(taskID) {


    if (!taskID || !mongoose.Types.ObjectId.isValid(taskID)) {
        throw new Error('InvalidTaskID');
    }

    const deletedTask = await Task.findByIdAndDelete(taskID);

    if (!deletedTask) {
        throw new Error('TaskDeletionFailed');
    }

    return deletedTask;
}

async function createSubtask(taskID) {
    if (!taskID || !mongoose.Types.ObjectId.isValid(taskID)) {
        throw new Error('InvalidTaskID');
    }
 
    const task = await Task.findById(taskID);
    if (!task) {
        throw new Error('TaskNotFound');
    }
 
    const subtask = {
        name: 'New Subtask'
    };
 
    task.subtasks.push(subtask);
 
    const updatedTask = await task.save();

    if (!updatedTask) {
        throw new Error('SubtaskCreationFailed');
    }
 
    return updatedTask;
}

async function updateSubtask(taskID, taskData) {
 
    const subtaskID = taskData.subtaskID;
    const subtaskUpdates = taskData.updates;

    if (!taskID || !mongoose.Types.ObjectId.isValid(taskID)) {
        throw new Error('InvalidTaskID');
    }

    const task = await Task.findById(taskID);
    if (!task) {
        throw new Error('TaskNotFound');
    }

    // Use the id method to find the subtask
    const subtask = task.subtasks.id(subtaskID);
    if (!subtask) {
        throw new Error('SubtaskNotFound');
    }

    // Apply the updates to the subtask
    Object.keys(subtaskUpdates).forEach((key) => {
        if (subtask[key] !== undefined) { // Ensure the key is defined on the subtask schema
            subtask[key] = subtaskUpdates[key];
        }
    });

    // Save the parent task document with the updated subtask
    const updatedTask = await task.save();
    if (!updatedTask) {
        throw new Error('SubtaskUpdateFailed');
    }

    return updatedTask;
}


const taskService = {
    getAllUserTasks,
    createTask,
    updateTask,
    deleteTask,
    createSubtask,
    updateSubtask
};


module.exports = taskService;