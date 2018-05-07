//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// - Settings in here executes only in Prod env.
//// -----------------------------------------------------------------
//// ** DO NOT INCLUDE COMMON / DEV SPECIFIC SETTINGS IN HERE ***
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    app: path.resolve(__dirname, 'src/app/index.js'),
    vendor: ['offline-plugin/runtime', 'react', 'react-dom', 'react-router-dom']
  },

  devtool: 'source-map',

  plugins: [
    new CleanWebpackPlugin(['dist']),

    new UglifyJSPlugin({
      sourceMap: true
    }),

    new webpack.optimize.ModuleConcatenationPlugin(),

    new OfflinePlugin({
      AppCache: false,
      ServiceWorker: { events: true },
    }),

  ]
});
