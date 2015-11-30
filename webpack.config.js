'use strict'

const path = require('path')

module.exports = {
	entry: path.join(__dirname, 'client/index.js'),
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'app.js',
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
		],
	},
}
