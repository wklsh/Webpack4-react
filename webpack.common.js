//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// Base Config for webpack.
//// - Settings in here executes on both Dev and Prod env.
//// -----------------------------------------------------------------
//// ** DO NOT INCLUDE DEV / PROD SPECIFIC SETTINGS IN HERE ***
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackBar = require("webpackbar");
const PreloadWebpackPlugin = require("preload-webpack-plugin");

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
			},

			{
				test: /\.(mov|mp4|mp3)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							publicPath: path.resolve(__dirname, "/"),
							outputPath: path.resolve(__dirname, "/"),
							context: path.resolve(__dirname, "src"),
							name: process.env.NODE_ENV == "development" ? "[path][name].[ext]" : "assets/[sha512:hash:base64:7].[ext]"
						}
					}
				]
			},

			{
				test: /\.(woff|woff2|eot|ttf)$/i,
				loader: "file-loader",
				options: {
					publicPath: path.resolve(__dirname, "/"),
					outputPath: path.resolve(__dirname, "/"),
					context: path.resolve(__dirname, "src"),
					name: process.env.NODE_ENV == "development" ? "[path][name].[ext]" : "css/type/[sha512:hash:base64:7].[ext]"
				}
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
			ImgAlias: path.resolve(__dirname, "src/img"),
			AudioAlias: path.resolve(__dirname, "src/audio")
		}
	},

	plugins: [
		new WebpackBar(),

		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html",
			inject: "body",
			chunksSortMode: "none"
		}),

		new PreloadWebpackPlugin({
			// Preload attr type to attach
			rel: "preload",

			// Read all assets first
			include: "allAssets",

			// Assign [as] attribute to special cases, else revert to script
			as(entry) {
				if (/\.(woff|woff2|eot|ttf)$/.test(entry)) return "font";
				if (/\.(gif|png|jpe?g|svg)$/.test(entry)) return "image";
				if (/\.(mov|mp4|mp3|webm|webp)$/.test(entry)) return "video";
				return "script";
			},

			// // Remove from preload list - since theres already a preloader
			// fileBlacklist: [/\.(gif|png|jpe?g|svg)/]
		}),

		new CopyWebpackPlugin([
			// { from: "./src/index.php", to: "index.php" },
			// { from: "./src/meta.json", to: "meta.json" },
			// { from: "./src/seo.php", to: "seo.php" },
			{ from: "./src/favicon.ico", to: "favicon.ico" },
			{ from: "./src/.htaccess", to: ".htaccess", toType: "file" },
			{ from: "./src/robots.txt", to: "robots.txt" }
		])
	]
};
