// Include Sequelize module.
const Sequelize = require('sequelize')

// Import sequelize object, 
// Database connection pool managed by Sequelize.
const sequelize = require('../config/db.config');
const { DataTypes, Model } = require('sequelize');
const posts = require('../models/post');

const users = sequelize.define('users', {
    // Column-1, user_id is an object with 
    // properties like type, keys, 
    // validation of column.
    id: {
        type: Sequelize.INTEGER,
        allowNull:     false,
        primaryKey:    true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING(180),
        allowNull: false,
        unique: true,
      },
      nom: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
        prenom: {
            type: Sequelize.STRING(60),
            allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profilePicture: {
        type: Sequelize.STRING,
        defaultValue: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp",
        allowNull: true,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

users.hasMany(posts, { onDelete: 'CASCADE'});
posts.belongsTo(users,{ onDelete: 'CASCADE'});

// Exporting User, using this constant
// we can perform CRUD operations on 'user' table.
module.exports = users;