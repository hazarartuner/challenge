const Session = require('./session');
const User = require('./user');
const UserSession = require('./user_session');
const Story = require('./story');
const Vote = require('./vote');

Session.belongsToMany(User, { through: UserSession });
User.belongsToMany(Session, { through: UserSession });
Session.hasMany(Story);
Story.belongsTo(Session);
Story.hasMany(Vote);
Vote.belongsTo(Story);
Vote.belongsTo(User);

module.exports = {
  Session,
  User,
  Story,
  Vote,
};
