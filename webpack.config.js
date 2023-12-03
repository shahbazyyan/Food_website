const path = require("node:path");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	mode: "production", // development || production
	entry: "./src/js/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "all.js",
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
	},
	watch: true,
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	}
};