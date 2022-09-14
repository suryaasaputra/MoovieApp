const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const path = require("path");

module.exports = {
	entry: "./src/app.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
	},
	module: {
		rules: [
			{
				test: /\.(scss)$/,
				use: [
					{
						loader: "style-loader",
					},
					{
						loader: "css-loader",
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: () => [require("autoprefixer")],
							},
						},
					},
					{
						loader: "sass-loader",
					},
				],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: [
					{
						loader: "file-loader",
						options: {},
					},
				],
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				loader: "file-loader",
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html",
			minify: {
				removeComments: true,
				collapseWhitespace: true,
			},
			favicon: "./src/img/favicon.ico",
		}),
		new CleanWebpackPlugin(),
	],

	devServer: {
		static: path.resolve(__dirname, "dist"),
		port: 8080,
		hot: true,
		client: {
			overlay: {
				errors: true,
				warnings: false,
			},
		},
	},
};
