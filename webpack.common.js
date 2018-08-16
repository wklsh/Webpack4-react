//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// Base Config for webpack.
//// - Settings in here executes on both Dev and Prod env.
//// -----------------------------------------------------------------
//// ** DO NOT INCLUDE DEV / PROD SPECIFIC SETTINGS IN HERE ***
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: {
		app: path.resolve(__dirname, "src/app/index.js")
	},

	module: {
		rules: [
			{
				test: /\.js[x]?$/,
				include: path.resolve(__dirname, "src"),
				exclude: path.resolve(__dirname, "node_modules"),
				loader: "babel-loader"
			},

			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					{
						loader: "file-loader",
						options: {
							publicPath: path.resolve(__dirname, "/"),
							outputPath: path.resolve(__dirname, "/"),
							context: path.resolve(__dirname, "src"),
							name: process.env.NODE_ENV == "development" ? "[path][name].[ext]" : "img/[sha512:hash:base64:7].[ext]"
						}
					}
				]
			}
		]
	},

	resolve: {
		extensions: [".css", ".scss", ".js", ".jsx"],
		alias: {
			AppAlias: path.resolve(__dirname, "src/app"),
			BaseAlias: path.resolve(__dirname, "src/app/base"),
			StyleAlias: path.resolve(__dirname, "src/app/base/styles"),
			ComponentsAlias: path.resolve(__dirname, "src/app/components"),
			ReduxAlias: path.resolve(__dirname, "src/app/redux"),
			ImgAlias: path.resolve(__dirname, "src/img")
		}
	},

	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html",
			inject: "body",
			chunksSortMode: "none"
		}),

		new CopyWebpackPlugin([
			// { from: "./src/index.php", to: "index.php" },
			// { from: "./src/meta.json", to: "meta.json" },
			// { from: "./src/seo.php", to: "seo.php" },
			{ from: "./src/.htaccess", to: ".htaccess", toType: "file" },
			{ from: "./src/robots.txt", to: "robots.txt" }
		])
	]
};
