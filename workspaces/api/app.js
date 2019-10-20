const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./services/sequelize');
const routes = require('./routes');
const responseHandlers = require('./middlewares/responseHandlers');
const authenticate = require('./middlewares/authenticate');

// eslint-disable-next-line no-console
console.log('Connecting to the database');

sequelize
  .authenticate()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connection succeed.');

    const app = express();
    app.use(bodyParser.json());
    app.use(authenticate());
    app.use(cors());
    app.use(responseHandlers);
    app.use('/', routes());
    app.listen(process.env.API_PORT || 9000);
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', err);
  });
