// eslint-disable-next-line import/no-dynamic-require
const configureStore = require(`./store.${
  process.env.NODE_ENV !== 'production' ? 'dev' : 'prod'
}.js`).default;

export default configureStore;
