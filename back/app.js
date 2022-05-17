const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Sequelize = require('Sequelize');
const multer = require('multer');
const path = require("path");
//require('dotenv').config() //pour notre variable d'environnement


//BASE DE DONNEE
//Import the sequelize object on which
//we have defined model.
const sequelize = require('./config/db.config')

//Import the user model we have defined
const users = require('./models/user');
const posts = require('./models/post');

// Sync all models that are not
// already in the database
sequelize.sync({alter: true, force:false}); 

//Routes
const userRoutes = require("./router/user");
const postRoutes = require("./router/post");


//Création de l'app Express
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); //Nous permet de lire le cookie contenant le token

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use("/images", express.static(path.join(__dirname, "images")));

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;