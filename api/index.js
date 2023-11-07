require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');
const register = require('./routes/create_user');
const login = require('./routes/authenticate_user');

// db connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/register", register);
app.use("/api/login", login);

const port = process.env.PORT || 8080;
app.listen(port, ()=> console.log('Listening on port ' + port));

