const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'groupamania',
  'root',
  'JCRJef0805!', {
    dialect: 'mysql',
    host: 'localhost',
  }
);
module.exports = sequelize;
