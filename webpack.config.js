'use strict';

module.exports = {
  watch: true,
  entry: {
  	donate: './components/donate/index.js'
  },
  output: {
  	path: './compiled/js',
    filename: '[name].js'
  },
  module: {
  	loaders: [
			{ 
				test: /\.js$/, 
				exclude: /node_modules/, 
				loader: 'babel-loader' 
			} 
		]
  }
};

