require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');
const userRoute = require('./routes/userRoute');
const taskRoute = require('./routes/taskRoute');
const workspaceRoute = require('./routes/workspaceRoute');

// db connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes 
app.use("/api/", userRoute); 
app.use("/api/tasks", taskRoute);
app.use("/api/workspaces", workspaceRoute)

const port = process.env.PORT || 8080;
app.listen(port, ()=> console.log('Listening on port ' + port));

