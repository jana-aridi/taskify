const userService = require("../services/userService");

const createUserController = async (req, res) => {
    try {

        const newUser = await userService.createUser(req.body);
        res.status(201).send({ message: "User created successfully" });

    } catch (error) {
        if (error.isJoi === true)
            res.status(400).send({ message: error.details[0].message });
        else if (error.message === 'UserExists')
            res.status(409).send({ message: "User with given email already exists" });
        else
            res.status(500).send({ message: "Internal Server Error" });
    }
};


const loginUserController = async (req, res) => {
    try {
        
        const data = await userService.loginUser(req.body);
        res.status(200).send({ data: data, message: "Logged in successfully" });

    } catch (error) {
        if (error.isJoi) {

            res.status(400).send({ message: error.details[0].message });

        } else if (error.message === 'InvalidUser') {

            res.status(401).send({ message: "Invalid user!" });

        } else if (error.message === 'InvalidPassword') {

            res.status(401).send({ message: "Invalid password!" });

        } else {

            res.status(500).send({ message: "Internal Server Error" });

        }
    }
};


const deleteUserController = async (req, res) => {
    try {

        const userID = req.params.userID;
        await userService.deleteUser(userID);

        res.status(201).send({ message: "User deleted successfully" });

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" + error });
    }
};


const joinWorkspaceController = async (req, res) => {
    try {
        console.log(req.params, req.body);
        const updatedUser = await userService.joinWorkspace(req.params.userID, req.body);
        console.log(updatedUser);
        res.status(200).send({message: "Joined workspace successfully" });

    } catch (error) {

        if (error.message === 'UserNotFound') {

            res.status(401).send({ message: "Invalid user!" });

        } else if (error.message === 'InvalidWorkspaceID') {

            res.status(401).send({ message: "Invalid workspace!" });

        } else if (error.message === 'MissingData') {

            res.status(401).send({ message: "Missing Data!" });

        } else if (error.message === 'JoinWorkspaceFailed') {

            res.status(401).send({ message: "Couldn't join workspace!" });

        } else {

            res.status(500).send({ message: "Internal Server Error" });

        }
    }
};

const getUserTasksController = async(req, res) => {
    try {
        console.log(req.params);
        const tasks = await userService.getUserTasks(req.params.userID);
        console.log(tasks);
        res.status(200).json(tasks);
        console.log('successful')
    } catch (error) {
        console.log(error)
        if (error.message === 'UserNotFound') {

            res.status(401).send({ message: "Invalid user!" });

        } else {

            res.status(500).send({ message: "Internal Server Error " + `${error}` });

        }
    }
}

const userController = {
    createUserController,
    loginUserController,
    deleteUserController,
    joinWorkspaceController,
    getUserTasksController,
}

module.exports = userController