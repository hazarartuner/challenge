const Ajv = require('ajv');

const ajv = new Ajv();

module.exports = ajv.compile({
  type: 'object',
  title: 'Register Validator',
  properties: {
    name: { type: ['string'] },
    email: { type: ['string'] },
    role: { type: 'string', enum: ['MASTER', 'DEVELOPER'] },
  },
  required: ['name', 'email', 'role'],
});
