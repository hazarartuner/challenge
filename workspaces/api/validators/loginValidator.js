const Ajv = require('ajv');

const ajv = new Ajv();

module.exports = ajv.compile({
  type: 'object',
  title: 'Login Validator',
  properties: {
    email: { type: ['string'] },
  },
  required: ['email'],
});
