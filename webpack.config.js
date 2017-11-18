const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/react-dropzone.js',
  output: {
    filename: 'react-dropzone.js',
    path: __dirname + '/dist',
    sourceMapFilename: '[file].map',
    devtoolModuleFilenameTemplate: '../[resource-path]',
    library: 'ReactDropzone',
    libraryTarget: 'umd'
  },
  externals: {
    'react': {
      'commonjs': 'react',
      'commonjs2': 'react',
      'amd': 'react',
      // React dep should be available as window.React, not window.react
      'root': 'React'
    },
    'react-dom': {
      'commonjs': 'react-dom',
      'commonjs2': 'react-dom',
      'amd': 'react-dom',
      'root': 'ReactDOM'
    }
  },
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(?:js|es|jsx).?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
