'use strict';

var React = require('react');
var ReactDOM = require('../node_modules/react-dom');
var DropzoneComponent = require('../lib/react-dropzone.js');

// Code taken from Issue 45

var componentConfig = {
    allowedFiletypes: ['.jpg', '.png'],
    postUrl: '/uploadHandler'
};

var eventHandlers = {
    removedfile: this.onImageRemoved,
    success: this.onImageUploaded
};

var djsConfig = {
    paramName: "image"
};

// Render
ReactDOM.render(
    <DropzoneComponent config={componentConfig} 
               eventHandlers={eventHandlers} 
               djsConfig={djsConfig} />,
    document.getElementById('content')
);

console.log(React.version);
