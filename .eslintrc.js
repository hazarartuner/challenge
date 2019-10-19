const path = require("path");

module.exports = {
  extends: ["airbnb", "prettier", "prettier/react"],
  plugins: ["react", "prettier", "react-hooks"],
  parser: "babel-eslint",
  rules: {
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", "jsx"]
      }
    ],
    "prettier/prettier": "error",
    "max-len": ["error", 100],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "consistent-return": "off"
  },
  env: {
    browser: true
  },
  globals: {
    window: true,
    require: true,
    describe: true,
    it: true,
    expect: true,
    beforeEach: true,
    afterEach: true,
    jest: true,
    beforeAll: true,
    afterAll: true,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [
          path.resolve(__dirname, 'src'),
        ],
      },
    },
  },
};
