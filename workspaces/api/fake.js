const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });

const sequelize = require('./services/sequelize');
const { User } = require('./models');

// eslint-disable-next-line no-console
console.log('Connecting to the database');

const users = [
  {
    id: 1,
    name: 'Hazar',
    email: 'hazar@gmail.com',
    role: 'MASTER',
  },
  {
    id: 2,
    name: 'Betül',
    email: 'betul@gmail.com',
    role: 'DEVELOPER',
  },
  {
    id: 3,
    name: 'Vardar',
    email: 'vardar@gmail.com',
    role: 'DEVELOPER',
  },
  {
    id: 4,
    name: 'Aral',
    email: 'aral@gmail.com',
    role: 'DEVELOPER',
  },
  {
    id: 5,
    name: 'Uwe',
    email: 'uwe@gmail.com',
    role: 'DEVELOPER',
  },
];

sequelize
  .authenticate()
  .then(async () => {
    // eslint-disable-next-line no-console
    console.log('Connection succeed.');

    await Promise.all(
      users.reduce((acc, user) => {
        acc.push(User.upsert(user));
        return acc;
      }, [])
    );

    process.exit();
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', err);
  });
