const { User, validate } = require("../models/user");
const Workspace = require("../models/workspace");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');   
const Joi = require("joi");


async function createUser(userData) {
    const { error } = validate(userData);
    if (error) {
        throw error;
    }

    const userExists = await User.findOne({ email: userData.email });
    if (userExists) {
        throw new Error('UserExists');
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    let workspaceID = null;
    if (userData.isAdmin) {
        workspaceID = uuidv4();
    }

    const newUser = await new User({
        ...userData,
        password: hashedPassword,
        workspaceID: workspaceID
    }).save();

    if (workspaceId !== null) {
        await Workspace.create({
            _id: workspaceID,
            admin: newUser._id,
        });
    }

    return newUser;
}


const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    });

    return schema.validate(data);
};

async function loginUser(userData) {
    const { error } = validateLogin(userData);
    if (error) {
        throw error;
    }

    const user = await User.findOne({ email: userData.email });
    if (!user) {
        throw new Error('InvalidUser');
    }

    const validPass = await bcrypt.compare(userData.password, user.password);
    if (!validPass) {
        throw new Error('InvalidPassword');
    }

    return user.generateAuthToken(); 
}


async function joinWorkspace(userID, data) {
    const user = await User.findById(userID);
    if (!user)
        throw new Error('UserNotFound')

    if (!data || data.length === 0)
        throw new Error('MissingData')

    workspaceID = data.workspaceID
    if (!workspaceID || !Workspace.id(workspaceID)) {
        throw new Error('InvalidWorkspaceID');
    }

    const updatedUser = await User.findByIdAndUpdate(userID, data, { new: true });

    if (!updatedUser) {
        throw new Error('UserUpdateFailed');
    }

    return updatedUser;
}


module.exports = {
    createUser, 
    loginUser,
    joinWorkspace
};
