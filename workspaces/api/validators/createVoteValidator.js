const Ajv = require('ajv');

const ajv = new Ajv();

module.exports = ajv.compile({
  type: 'object',
  title: 'Create Vote Validator',
  properties: {
    storyId: { type: 'integer' },
    userId: { type: 'integer' },
    score: { type: 'integer' },
  },
  required: ['storyId', 'userId', 'score'],
});
