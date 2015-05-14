'use strict';

var React = require('react');
var ReactFilePicker = require('../src/filepicker');

var componentConfig = {
    allowedFiletypes: ['jpg', 'png', 'gif'],
    showFiletypeIcon: false,
    postUrl : '/uploadHandler'
};

var dropzoneConfig = {

}

// Render
React.render(<ReactFilePicker config={componentConfig} dropzoneConfig={dropzoneConfig} />, document.getElementById('content'));