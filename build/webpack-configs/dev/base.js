/* eslint-disable no-console */

const merge = require('webpack-merge');
const config = require('../../config');

module.exports = merge(require('../base'), {
  output: {
    path: config.dev.tmpDir,
  },
});
