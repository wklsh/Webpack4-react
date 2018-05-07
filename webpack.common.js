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
    compress: true,
    port: 3000
  },

  module: {
    rules: [
      {
        test: /\.css$/, 
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules')
        ], 
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: {loader:"css-loader", options: { url:false, minimize:true }}
        })
      },

      {
        test: /\.scss$/,
        use: new ExtractTextPlugin({
          filename: "css/[name].[hash].css",
          disable: false
        }).extract({
          use: [
            { loader: "css-loader" }, 
            { loader: "sass-loader" }
          ],
          fallback: "style-loader"
        })
      },

      {
        test: /\.js[x]?$/, 
        include: path.resolve(__dirname, 'src'), 
        exclude: /node_modules/, 
        loader: 'babel-loader'
      }
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
      disable: false
    }),
  ]
};