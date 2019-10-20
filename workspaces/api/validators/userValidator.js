const Ajv = require('ajv');

const ajv = new Ajv();

module.exports = ajv.compile({
  type: 'object',
  title: 'User Schema',
  properties: {
    name: { type: ['string'] },
    email: { type: ['string'] },
    role: { type: 'string', enum: ['MASTER', 'DEVELOPER'] },
  },
  additionalProperties: false,
});
