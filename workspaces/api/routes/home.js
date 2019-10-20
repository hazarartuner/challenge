const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 200,
    payload: {
      message: 'All is Well!',
    },
  });
});

module.exports = router;
