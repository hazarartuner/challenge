const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });

const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    compress: true,
    port: process.env.WEB_PORT || 3000,
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: false,
      warnings: false,
      publicPath: false,
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
