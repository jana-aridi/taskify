const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },

    admin: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'user' 
    },

     employees: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'user',
        default: [],
    }
    
    
});

const Workspace = mongoose.model('Workspace', workspaceSchema);

module.exports = Workspace;
