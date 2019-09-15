const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '../src/app/index.jsx'),

  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../dist'),
  },

  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader',
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name:
                process.env.NODE_ENV !== 'production'
                  ? '[path][name].[ext]'
                  : '[sha512:hash:base64:7].[ext]',
              outputPath: process.env.NODE_ENV !== 'production' ? 'images/' : 'assets/',
              publicPath: process.env.NODE_ENV !== 'production' ? 'images/' : 'assets/',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name:
                process.env.NODE_ENV !== 'production'
                  ? '[path][name].[ext]'
                  : '[sha512:hash:base64:7].[ext]',
              outputPath: process.env.NODE_ENV !== 'production' ? 'fonts/' : 'assets/',
              publicPath: process.env.NODE_ENV !== 'production' ? 'fonts/' : 'assets/',
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName:
                process.env.NODE_ENV !== 'production' ? '[name]---[local]' : '[hash:base64:8]',
              camelCase: true,
              url: false,
              sourceMap: process.env.NODE_ENV !== 'production',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: process.env.NODE_ENV !== 'production',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: process.env.NODE_ENV !== 'production',
            },
          },
        ],
      },

      {
        test: /\.js[x]?$/i,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.jsx', '.js', '.scss', '.css'],
    alias: {
      Src: path.resolve(__dirname, '../src'),
      Styles: path.resolve(__dirname, '../src/app/base/styles'),
    },
  },

  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),

    new PreloadWebpackPlugin({
      rel: 'preload',
      as(entry) {
        if (/\.(woff|woff2|ttf|otf)$/.test(entry)) return 'font';
      },
      fileWhitelist: [/\.(woff|woff2|ttf|otf)$/],
      include: 'allAssets',
    }),

    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),

    new MiniCssExtractPlugin({
      filename: 'css/style.css',
      chunkFilename:
        process.env.NODE_ENV !== 'production' ? 'css/[id].css' : 'css/[id].[chunkhash:8].css',
      disable: false,
      allChunks: true,
    }),
  ],
};
