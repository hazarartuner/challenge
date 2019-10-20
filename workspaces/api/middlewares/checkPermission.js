const models = require('../models');

module.exports = requiredRoles => async (req, res, next) => {
  const authorization = req.header('Authorization');
  const token = authorization ? authorization.replace('Basic', '').trim() : null;

  if (!token) {
    return res.responseHandlers.forbidden();
  }

  const email = Buffer.from(token, 'base64').toString('utf-8');

  if (!email) {
    return res.responseHandlers.forbidden();
  }

  const user = await models.User.findOne({ where: { email } });

  if (!user || requiredRoles.indexOf(user.get('role')) < 0) {
    return res.responseHandlers.forbidden();
  }

  next();
};
