const { Model, DataTypes } = require('sequelize');
const sequelize = require('./../services/sequelize');

class Vote extends Model {}

Vote.init(
  {
    score: DataTypes.INTEGER,
  },
  { sequelize, modelName: 'vote' }
);

module.exports = Vote;
