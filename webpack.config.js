// const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.js',

	devtool: 'inline-source-map',
	devServer: {
		static: './dist',
	},

	// plugins: [
	// 	new HtmlWebpackPlugin({
	// 		// title: 'Output Management',
	// 		title: 'Mode development',
	// 	}),
	// ],
	output: {
		path: path.resolve(__dirname, 'dist'),
		// filename: 'bundle.js',
		filename: 'bundle.js',
		// clean: true,
	},
	// optimization: {
	// 	runtimeChunk: 'single',
	// },
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
		],
	},
};
