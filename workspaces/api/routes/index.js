const express = require('express');
const home = require('./home');
const auth = require('./auth');

module.exports = () => {
  const router = express.Router();

  router.get('/', home);
  router.use('/auth', auth);
  router.use('*', (req, res) => {
    res.status(404).json({
      status: 404,
      payload: {
        message: 'Not Found!',
        url: req.url,
      },
    });
  });

  return router;
};
