module.exports = {
    output: {
        filename: 'react-dropzone.js',
        libraryTarget: 'umd',
        library: 'DropzoneComponent',
    },
    externals: {
        // Use external version of React
        "react": "React",
        "react-dom": "ReactDOM"
    }
}