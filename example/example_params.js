'use strict';

var React = require('react');
var ReactDOM = require('../node_modules/react-dom');
var DropzoneComponent = require('../lib/react-dropzone.js');

// Add params to your dropzonejs configuration object, like so:
var djsConfig = {
    addRemoveLinks: true,
    params: {
        myParam: 'Hello from a parameter!',
        anotherParam: 43
    }
};

var componentConfig = {
    showFiletypeIcon: false,
    postUrl: '/uploadHandler'
};

// Render
ReactDOM.render(<DropzoneComponent config={componentConfig} djsConfig={djsConfig} />, document.getElementById('content'));
