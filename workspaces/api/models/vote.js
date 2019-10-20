const { Model, DataTypes } = require('sequelize');
const sequelize = require('./../services/sequelize');

class Vote extends Model {}

Vote.init(
  {
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'vote' }
);

module.exports = Vote;
