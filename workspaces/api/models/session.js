const { Model, DataTypes } = require('sequelize');
const sequelize = require('./../services/sequelize');

class Session extends Model {}

Session.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'session' }
);

module.exports = Session;
