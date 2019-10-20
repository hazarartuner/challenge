const { User } = require('../models');

module.exports = () => async (req, res, next) => {
  const authorization = req.header('Authorization');
  const token = authorization ? authorization.replace('Basic', '').trim() : null;

  if (!token) {
    return next();
  }

  const email = Buffer.from(token, 'base64').toString('utf-8');

  if (!email) {
    return next();
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return next();
  }

  req.user = user.toJSON();

  next();
};
