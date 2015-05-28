# React-Dropzone
A dropzone component for ReactJS, allowing users to "drag and drop" files into an upload area. The component uses the battle-tested [Dropzone.js](http://www.dropzonejs.com/) to provide a cross-browser-compatible upload component.

You [can see a demo of the uploader with minimal configuration here](http://reactdropzone.azurewebsites.net/example).

![](https://raw.githubusercontent.com/felixrieseberg/React-Dropzone/master/.dropzone.gif)

## Usage
The component is initialized with a configuration object. Optional are a list of event handlers and a configuration object for dropzone.js.

```js
var React = require('react');

React.render(
    <DropzoneComponent config={componentConfig} 
                       eventHandlers={eventHandlers} 
                       djsConfig={djsConfig} />, 
    document.getElementById('content')
);
```

The configuration allows you to disable the display of CSS file type icons, to set the allowed file types, and to set the URL to which uploads should be posted.

```js
var componentConfig = {
    allowedFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true,
    postUrl: '/uploadHandler'
};
```

Callbacks can be provided in an object literal. 

```js
var eventHandlers = {
    // This one receives the dropzone object as the first parameter
    // and can be used to additional work with the dropzone.js 
    // object
    init: null,
    // All of these receive the event as first parameter:
    drop: callbackArray,
    dragstart: null,
    dragend: null,
    dragenter: null,
    dragover: null,
    dragleave: null,
    // All of these receive the file as first parameter:
    addedfile: simpleCallBack,
    removedfile: null,
    thumbnail: null,
    error: null,
    processing: null,
    uploadprogress: null,
    sending: null,
    success: null,
    complete: null,
    canceled: null,
    maxfilesreached: null,
    maxfilesexceeded: null,
    // All of these receive a list of files as first parameter 
    // and are only called if the uploadMultiple option 
    // in djsConfig is true:
    processingmultiple: null,
    sendingmultiple: null,
    successmultiple: null,
    completemultiple: null,
    canceledmultiple: null,
    // Special Events
    totaluploadprogress: null,
    reset: null,
    queuecompleted: null
}
```

To provide a single callback, simply override one of these events with your function reference. If you want to provide multiple callbacks, simply provide an array with your function references.

```js
var callbackArray = [
    function () {
        console.log('Look Ma, I\'m a callback in an array!');
    },
    function () {
        console.log('Wooooow!');
    }
];

var simpleCallBack = function () {
    console.log('I\'m a simple callback');
};
```

## Server Example
This component comes with a small server example. To try it out, simply run `npm install` and then `grunt` from the component's folder. Visit `http://localhost:8000/example/` to see the uploads working. 

To check out the (super small) source code for this simple upload-accepting server, check out `src-server/` and `server.js`. **The component works with any server infrastructure, though!**

## License
MIT. For details, please consult `README.md`.
