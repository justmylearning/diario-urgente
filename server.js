const express = require('express');
const app = express();
var bodyParser = require('body-parser');

const userRoutes = require('./app/controllers/UserController.js');
const authRoutes = require('./app/controllers/AuthController.js');
const postRoutes = require('./app/controllers/PostController.js');
const commentRoutes = require('./app/controllers/CommentController.js');
const postCategoryRoutes = require('./app/controllers/PostCategoryController.js');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(userRoutes);
app.use(authRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.use(postCategoryRoutes);

app.get('/', (req, res) => {
    res.send('its work');
})

app.listen(3000);

module.exports = app;