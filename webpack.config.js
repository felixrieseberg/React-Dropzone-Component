const path = require('path')

module.exports = {
  entry: './src/react-dropzone.js',
  output: {
    filename: 'react-dropzone.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'DropzoneComponent'
  },
  externals: {
    // Use external version of React
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
