'use strict';

var React = require('../node_modules/react');
var DropzoneComponent = require('../lib/dropzone.js');

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
React.render(<DropzoneComponent config={componentConfig} djsConfig={djsConfig} />, document.getElementById('content'));