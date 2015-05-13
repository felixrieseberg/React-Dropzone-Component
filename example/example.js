'use strict';

var React = require('react');
var Spreadsheet = require('../src/filepicker');

var config = {
    allowedFiletypes: ['jpg', 'png', 'gif'],
    showFiletypeIcon: false
};

// Render
React.render(<Filepicker config={config} />, document.getElementById('content'));
