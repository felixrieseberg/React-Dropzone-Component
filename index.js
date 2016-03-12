var exported;

if (require('react') && require('react-dom')) {
    exported = require('./lib/react-dropzone.js');
} else {
    exported = require('./dist/dropzone.js');
}

module.exports = exported;