//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// - Settings in here executes only in Dev env.
//// -----------------------------------------------------------------
//// ** DO NOT INCLUDE COMMON / PROD SPECIFIC SETTINGS IN HERE ***
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");

module.exports = merge(common, {
	mode: "development",

	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "js/[name].js"
	},

	devServer: {
		historyApiFallback: true,
		inline: true,
		progress: true,
		contentBase: "./src",
		watchContentBase: true,
		compress: true,
		host: "0.0.0.0",
		quiet: true,
		hot: true,
		port: 3000,
		headers: {
			"Access-Control-Allow-Origin": "*"
		}
	},

	module: {
		rules: [
			{
				test: /\.(css|scss)$/i,
				use: [
					{
						loader: "style-loader",
						options: {
							sourceMap: true
						}
					},
					{
						loader: "css-loader",
						options: {
							url: true,
							minimize: false,
							sourceMap: true
						}
					},
					{
						loader: "postcss-loader",
						options: {
							sourceMap: true
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	},

	plugins: [
		// Check for any duplicated plugins within npm node modules
		new DuplicatePackageCheckerPlugin()
	]
});
