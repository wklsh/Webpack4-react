//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// Base Config for webpack. 
//// - Settings in here executes on both Dev and Prod env.
//// -----------------------------------------------------------------
//// ** DO NOT INCLUDE DEV / PROD SPECIFIC SETTINGS IN HERE ***
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devServer: {
    historyApiFallback: true,
    inline: true,
    progress: true,
    contentBase: './src',
    watchContentBase: true,
    compress: true,
    host: '0.0.0.0',
    port: 3000,
  },

  module: {
    rules: [
      {
        test: /\.[s]css?$/, 
        exclude: path.resolve(__dirname, 'node_modules'),
        use: ExtractTextPlugin.extract({
          use: [
            { loader: "css-loader", options: { url: false, minimize: false, sourceMap: (process.env.NODE_ENV == 'development' ? true : false) }},
            { loader: "postcss-loader", options: { sourceMap: (process.env.NODE_ENV == 'development' ? true : false) }},
            { loader: "sass-loader", options: { sourceMap: (process.env.NODE_ENV == 'development' ? true : false) }}
          ],
          fallback: "style-loader"
        })
      },

      {
        test: /\.js[x]?$/, 
        include: path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'babel-loader'
      },
    ]
  },
  
  resolve: {
    extensions: ['.css', '.scss', '.js', '.jsx']
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      inject: 'body'
    }),

    new ExtractTextPlugin({
      filename: "css/[name].[hash].css",
      disable: false,
      allChunks: true
    }),
  ]
};
