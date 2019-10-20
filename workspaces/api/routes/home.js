const express = require('express');

const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
  return models.Session.findAll({
    attributes: ['id', 'title'],
  })
    .then(sessions => {
      res.json({
        status: 200,
        payload: {
          message: 'All is Well!',
          session: sessions[0].get('title'),
        },
      });
    })
    .catch(error => {
      res.json({
        status: 500,
        payload: {
          message: error.message,
        },
      });
    });
});

module.exports = router;
