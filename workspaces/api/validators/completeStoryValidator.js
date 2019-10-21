const Ajv = require('ajv');

const ajv = new Ajv();

module.exports = ajv.compile({
  type: 'object',
  title: 'Complete Story Validator',
  properties: {
    finalScore: { type: 'integer' },
  },
  required: ['finalScore'],
});
