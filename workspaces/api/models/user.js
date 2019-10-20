const { Model, DataTypes } = require('sequelize');
const sequelize = require('./../services/sequelize');

class User extends Model {}

User.init(
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.ENUM('MASTER', 'DEVELOPER'),
  },
  { sequelize, modelName: 'user' }
);

module.exports = User;
