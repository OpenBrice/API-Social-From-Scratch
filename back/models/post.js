
const Sequelize = require('sequelize')
const sequelize = require('../config/db.config');
const users = require('../models/user');
const { DataTypes, Model } = require('sequelize');

const posts = sequelize.define('posts', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true, 
  },
  description: {
    type: Sequelize.STRING(500),
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  likes: {
    type: DataTypes.INTEGER,
  },
  dislikes: {
    type: DataTypes.INTEGER,
  },
});


module.exports = posts;