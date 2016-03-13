'use strict';

var React             = require('react');
var DropzoneComponent = require('react-dropzone-component');

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
React.render(React.createElement(DropzoneComponent, { 
        config: componentConfig,
        djsConfig: djsConfig 
    }), document.getElementById('content')
);