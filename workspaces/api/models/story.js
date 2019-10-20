const { Model, DataTypes } = require('sequelize');
const sequelize = require('./../services/sequelize');

class Story extends Model {}

Story.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    finalScore: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM('ACTIVE', 'VOTED', 'NOT_VOTED'),
      defaultValue: 'NOT_VOTED',
      allowNull: false,
    },
  },
  { sequelize, modelName: 'story' }
);

module.exports = Story;
