const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });

// Require it to define the models schemas
require('./models');
const sequelize = require('./services/sequelize');

// eslint-disable-next-line no-console
console.log('Connecting to the database');

sequelize
  .authenticate()
  .then(async () => {
    // eslint-disable-next-line no-console
    console.log('Connection succeed.');

    sequelize.sync({ force: ['--force', '-f'].indexOf(process.argv[2]) >= 0 }).finally(() => {
      process.exit();
    });
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', err);
  });
