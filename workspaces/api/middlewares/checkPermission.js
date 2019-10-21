module.exports = requiredRoles => async (req, res, next) => {
  const { user } = req;

  if (!user || requiredRoles.indexOf(user.role) < 0) {
    return res.forbidden({ message: `You don't have permission!` });
  }

  next();
};
