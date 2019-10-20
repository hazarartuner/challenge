const { Model, DataTypes } = require('sequelize');
const sequelize = require('./../services/sequelize');

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('MASTER', 'DEVELOPER'),
      allowNull: false,
    },
  },
  { sequelize, modelName: 'user' }
);

module.exports = User;
