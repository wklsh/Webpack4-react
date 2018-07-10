//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// - Settings in here executes only in Prod env.
//// -----------------------------------------------------------------
//// ** DO NOT INCLUDE COMMON / DEV SPECIFIC SETTINGS IN HERE ***
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const OfflinePlugin = require("offline-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const common = require("./webpack.common.js");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
	mode: "production",

	entry: {
		vendor: ["offline-plugin/runtime", "react", "react-dom", "react-router-dom"]
	},

	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "js/[name].[chunkhash].js"
	},

	devtool: "nosources-source-map",

	module: {
		rules: [
			{
				test: /\.(css|scss)$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							url: true,
							minimize: process.env.NODE_ENV == "development" ? false : true,
							sourceMap: process.env.NODE_ENV == "development" ? true : false
						}
					},
					{
						loader: "postcss-loader",
						options: {
							sourceMap: process.env.NODE_ENV == "development" ? true : false
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: process.env.NODE_ENV == "development" ? true : false
						}
					}
				]
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					{
						loader: "image-webpack-loader",
						options: {
							mozjpeg: {
								progressive: true,
								quality: 75
							},
							optipng: {
								optimizationLevel: 5
							},
							pngquant: {
								enabled: false
							},
							gifsicle: {
								interlaced: true
							}
						}
					}
				]
			}
		]
	},

	plugins: [
		// Removes older dist folder before every production build
		new CleanWebpackPlugin(["dist"]),

		// JS Minifications
		new UglifyJSPlugin({
			sourceMap: false
		}),

		// Offline caching
		new OfflinePlugin({
			AppCache: false,
			ServiceWorker: { events: true }
		}),

		// CSS file extracts
		new MiniCssExtractPlugin({
			filename: "css/[contenthash].css",
			chunkFilename: "css/[contenthash].css"
		}),

		// Webpack optimisations
		new webpack.optimize.ModuleConcatenationPlugin()
	]
});
