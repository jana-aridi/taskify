const router = require("express").Router();
const {User, validate} = require("../models/user");
const Workspace = require("../models/workspaces");
const { v4: uuidv4 } = require('uuid'); 
const bcrypt = require("bcrypt");


// to add a user in the database (Create)
router.post("/", async(req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) 
            return res.status(400).send({message: error.details[0].message});
    

        const user = await User.findOne({email: req.body.email});

        if (user)
            return res.status(409).send({message: "User with given email already exists"});
        
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        // if the user is a work-space creator generate a workspace-ID for the user else consider it none, till user is assigned
        let workspaceId = null;
        if (req.body.isAdmin) {
            workspaceId = uuidv4();
        }

        let newUser = await new User({
            ...req.body,
            password: hashedPassword,
            workspaceId: workspaceId  
        }).save();

        if (workspaceId !== null)
            Workspace.create({
                _id: workspaceId,
                admin: newUser,
            });

        // return success response to client
        res.status(201).send({message: "User created successfully"});

    }
    catch(error) {
        res.status(500).send({message: "Internal Server Error"});
    }
})
module.exports = router;