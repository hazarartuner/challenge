const express = require('express');
const loginValidator = require('../validators/loginValidator');
const registerValidator = require('../validators/registerValidator');
const { User } = require('./../models');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email } = req.body;

  if (!loginValidator(req.body)) {
    return res.badRequest({ details: loginValidator.errors });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.notFound({ message: 'User not found' });
    }

    return res.success({
      ...user.toJSON(),
      token: Buffer.from(email).toString('base64'),
    });
  } catch (error) {
    return res.internalServerError({ details: error });
  }
});

router.post('/register', async (req, res) => {
  const { email, name, role } = req.body;

  if (!registerValidator(req.body)) {
    return res.badRequest({ details: registerValidator.errors });
  }

  try {
    let user = await User.findOne({ where: { email } });

    if (user) {
      return res.conflict({ message: 'This email is used by another user' });
    }

    user = await User.create({
      email,
      name,
      role,
    });

    return res.success({
      ...user.toJSON(),
      token: Buffer.from(email).toString('base64'),
    });
  } catch (error) {
    return res.internalServerError({ details: error });
  }
});

module.exports = router;
