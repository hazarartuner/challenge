const Ajv = require('ajv');

const ajv = new Ajv();

module.exports = ajv.compile({
  type: 'object',
  title: 'Create Session Validator',
  properties: {
    title: { type: 'string' },
    slug: { type: 'string' },
    voterCount: { type: 'integer' },
    stories: { type: 'array' },
  },
  required: ['title', 'slug', 'voterCount', 'stories'],
});
