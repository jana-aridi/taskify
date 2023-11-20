const taskService = require('../services/taskService');

const createTaskController = async(req, res) => {
    try {
        console.log('creating new task')
        console.log(req.body)
        const newTask = await taskService.createTask(req.body);
        const newTaskResponse = await newTask.populate('assignees');
        console.log('new task res ' + newTaskResponse)
        res.status(201).send(newTaskResponse);

    } catch (error) {
        if (error.message === 'TaskDataRequired')
            res.status(422).send({ message: "Task Data is missing!" });
        else if (error.message === 'TaskCreationFailed')
            res.status(500).send({ message: "Couldn't create task!" });
        else {
            res.status(500).send({ message: "Internal Server Error"});
            console.log(error)
        }
    }

}

const updateTaskController = async(req, res) => {

    try {
 
        const { updatedTask, warning } = await taskService.updateTask(req.params.taskID, req.body);
 
        // Check if there's a warning message about the due date and include it in the response if present.
        const responseMessage = warning
            ? `Task updated successfully, but note: ${warning}`
            : "Task updated successfully!";
 
        res.status(200).send({ message: responseMessage, updatedTask }); 

    } catch (error) {
        if (error.message === 'InvalidTaskID')
            res.status(422).send({ message: "Task not found!" });
        
        else if (error.message === 'TaskUpdateDataRequired')
            res.status(500).send({ message: "Task data required!" });

        else if (error.message === 'TaskCreationFailed')
            res.status(500).send({ message: "Couldn't create task!" });
       
        else
            res.status(500).send({ message: "Internal Server Error" });
    }
}

const deleteTaskController = async(req, res) => {

    try {

        taskService.deleteTask(req.params.taskID);
        
        res.status(201).send({ message: "Task deleted successfully!" });

    } catch (error) {
        if (error.message === 'InvalidTaskID')
            res.status(422).send({ message: "Task not found!" });
            
        else if (error.message === 'TaskDataRequired')
            res.status(500).send({ message: "Task data required!" }); 

        else if (error.message === 'TaskDeletionFailed')
            res.status(500).send({ message: "Couldn't delete task!" });
       
        else
            res.status(500).send({ message: "Internal Server Error" });
    }
}

const createSubtaskController = async(req, res) => {

    try {
        console.log(req.params) 
        taskService.createSubtask(req.params.taskID);
        
        res.status(201).send({ message: "Subtask added successfully!" });

    } catch (error) {
        if (error.message === 'InvalidTaskID' || error.message === "TaskNotFound")
            res.status(422).send({ message: "Task not found!" });
             
        else if (error.message === 'SubtaskCreationFailed')
            res.status(500).send({ message: "Couldn't create subtask!" });
       
        else
            res.status(500).send({ message: "Internal Server Error" });
    }
}

const updateSubtaskController = async(req, res) => {
    try {    

        const updatedTask = await taskService.updateSubtask(req.params.taskID, req.body);
 
        res.status(200).send({ message: 'update successful!'})
        // .json(updatedTask);
    } catch (error) {
        
        const status = error.statusCode || 500;
        res.status(status).json({ message: error.message });
    }
}

const taskController = {
    createTaskController,
    updateTaskController,
    deleteTaskController,
    createSubtaskController,
    updateSubtaskController,
};

module.exports = taskController