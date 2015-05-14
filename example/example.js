'use strict';

var React = require('react');
var DropzoneComponent = require('../src/dropzone');

var componentConfig = {
    allowedFiletypes: ['jpg', 'png', 'gif'],
    showFiletypeIcon: false,
    postUrl : '/uploadHandler'
};

/**
 * For a full list of possible configurations,
 * please consult
 * http://www.dropzonejs.com/#configuration
 */
var djsConfig = {

}

// Render
React.render(<DropzoneComponent config={componentConfig} djsConfig={djsConfig} />, document.getElementById('content'));