const fs   = require('fs-extra');
const path = require('path');

const lib = path.resolve(__dirname, '..', 'lib');
const pkg = path.resolve(__dirname, '..', 'package.json');
const dest = path.resolve(__dirname, 'node_modules', 'react-dropzone-component');

fs.ensureDirSync(dest);
fs.emptyDirSync(dest);
fs.copySync(lib, path.resolve(dest, 'lib'));
fs.copySync(pkg, path.resolve(dest, 'package.json'));
