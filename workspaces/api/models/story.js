const { Model, DataTypes } = require('sequelize');
const sequelize = require('./../services/sequelize');

class Story extends Model {}

Story.init(
  {
    title: DataTypes.STRING,
    score: DataTypes.INTEGER,
  },
  { sequelize, modelName: 'story' }
);

module.exports = Story;
