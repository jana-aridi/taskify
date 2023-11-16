const {createUser, loginUser} = require("../services/userService");

const createUserController = async (req, res) => {
    try {

        const newUser = await createUser(req.body);
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
        
        const token = await loginUser(req.body);
        res.status(200).send({ data: token, message: "Logged in successfully" });

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
 

module.exports = {createUserController, loginUserController}