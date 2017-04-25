module.exports = {
  entry: './src/react-dropzone.js',
  output: {
    filename: './dist/react-dropzone.js',
    sourceMapFilename: './dist/react-dropzone.js.map',
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
  module: {
    loaders: [
      {
        test: /\.(?:js|es).?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
