'use strict';

var React = require('react');
var Spreadsheet = require('../src/filepicker');

var config = {
    showFiletypeIcon: false
};

// Render
React.render(<Filepicker config={config} />, document.getElementById('content'));
