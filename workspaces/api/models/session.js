const { Model, DataTypes } = require('sequelize');
const sequelize = require('./../services/sequelize');

class Session extends Model {}

Session.init(
  {
    title: DataTypes.STRING,
  },
  { sequelize, modelName: 'session' }
);

module.exports = Session;
