const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });

const express = require('express');
const cors = require('cors');
const sequelize = require('./services/sequelize');
const routes = require('./routes');

// eslint-disable-next-line no-console
console.log('Connecting to database');

sequelize
  .authenticate()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');

    const app = express();
    app.use(cors());
    app.use('*', routes());
    app.listen(process.env.API_PORT || 9000);
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', err);
  });
