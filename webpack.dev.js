//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// - Settings in here executes only in Dev env.
//// -----------------------------------------------------------------
//// ** DO NOT INCLUDE COMMON / PROD SPECIFIC SETTINGS IN HERE ***
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: path.resolve(__dirname, 'src/app/index.js'),

  devtool: 'inline-source-map',
});