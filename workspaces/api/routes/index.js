const express = require('express');
const auth = require('./auth');
const session = require('./session');
const vote = require('./vote');
const story = require('./story');

module.exports = () => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.json({
      status: 200,
      payload: {
        message: 'All is Well!',
      },
    });
  });
  router.use('/auth', auth);
  router.use('/session', session);
  router.use('/vote', vote);
  router.use('/story', story);
  router.use('*', (req, res) => {
    return res.responseHandlers.notFound();
  });

  return router;
};
