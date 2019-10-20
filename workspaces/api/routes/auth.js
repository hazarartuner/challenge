const express = require('express');
const loginValidator = require('../validators/loginValidator');
const { User } = require('./../models');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, name, role } = req.body;

  if (!loginValidator(req.body)) {
    return res.responseHandlers.badRequest(loginValidator.errors);
  }

  try {
    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({
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
