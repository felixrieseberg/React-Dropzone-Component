'use strict';

var React = require('react');
var ReactFilePicker = require('../src/filepicker');

var config = {
    allowedFiletypes: ['jpg', 'png', 'gif'],
    showFiletypeIcon: false,
    postUrl : '/uploadHandler'
};

// Render
React.render(<ReactFilePicker config={config} />, document.getElementById('content'));