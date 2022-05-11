const Sequelize = require('sequelize')
const sequelize = require('../config/db.config');
const users = require('../models/user');
const { DataTypes, Model } = require('sequelize');

const likes = sequelize.define('likes', {
    id: {
        type: Sequelize.INTEGER,
        allowNull:     false,
        primaryKey:    true,
        autoIncrement: true,
    },
    likes: {
        type: DataTypes.INTEGER,
    },
    dislikes: {
        type: DataTypes.INTEGER,
    },
});


module.exports = posts;