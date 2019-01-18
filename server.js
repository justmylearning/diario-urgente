const express = require('express');
const app = express();
var bodyParser = require('body-parser');

const userRoutes = require('./app/controllers/UserController.js');
const authRoutes = require('./app/controllers/AuthController.js');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(userRoutes);
app.use(authRoutes);

app.listen(3000);