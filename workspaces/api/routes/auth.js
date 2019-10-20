const express = require('express');
const userValidator = require('./../validators/userValidator');
const models = require('./../models');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, name, role } = req.body;

  if (!userValidator(req.body)) {
    return res.responseHandlers.badRequest(userValidator.errors);
  }

  try {
    let user = await models.User.findOne({ where: { email } });

    if (!user) {
      user = await models.User.create({
        email,
        name,
        role,
      });
    }

    return res.responseHandlers.success(user);
  } catch (error) {
    return res.responseHandlers.internalServerError(error);
  }
});

module.exports = router;
