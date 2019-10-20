const express = require('express');

const router = express.Router();
const home = require('./home');

module.exports = () => {
  router.use('/', home);
  router.use('*', (req, res) => {
    res.status(404).json({
      status: 404,
      payload: {
        message: 'Not Found!',
      },
    });
  });

  return router;
};
