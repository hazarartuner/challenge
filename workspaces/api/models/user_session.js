const { Model } = require('sequelize');
const sequelize = require('./../services/sequelize');

class UserSession extends Model {}

UserSession.init({}, { sequelize, modelName: 'user_session' });

module.exports = UserSession;
