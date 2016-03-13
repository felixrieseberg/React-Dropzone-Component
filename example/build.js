const fs   = require('fs-extra');
const path = require('path');

/**
 * Simple build script that copies the dist version of react-dropzone-component into the example folder
 * 
 * The copy is only necessary since webpack will otherwise throw a fit in the root module
 */
function build() {
    fs.copySync(path.resolve(__dirname, '..', 'dist', 'react-dropzone.js'), './src/react-dropzone.js');
}

build();