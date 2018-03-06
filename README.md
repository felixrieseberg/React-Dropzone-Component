## Dropzone.js Component for React
[![Build Status](https://travis-ci.org/felixrieseberg/React-Dropzone-Component.svg?branch=master)](https://travis-ci.org/felixrieseberg/React-Dropzone-Component) [![Dependency Status](https://david-dm.org/felixrieseberg/react-dropzone-component.svg)](https://david-dm.org/felixrieseberg/react-dropzone-component) [![npm version](https://badge.fury.io/js/react-dropzone-component.svg)](https://badge.fury.io/js/react-dropzone-component) ![Downloads](https://img.shields.io/npm/dm/react-dropzone-component.svg)

A Dropzone component for ReactJS, allowing users to "drag and drop" files into an upload area. The component uses the battle-tested [Dropzone.js](http://www.dropzonejs.com/) to provide a cross-browser-compatible upload component.

You [can see a demo of the uploader with minimal configuration here](http://reactdropzone.azurewebsites.net/example).

<div align="center">
  <img src="https://raw.githubusercontent.com/felixrieseberg/React-Dropzone/master/.dropzone.gif" alt="Screen GIF" />
</div>

 * [Simple Usage Example](#usage)
   * [Accessing the Dropzone.js object](#accessing-the-dropzone-object)
   * [Usage without automatic posting](#usage-without-automatic-posting)
   * [Custom Preview Template](#custom-preview-template)
   * [Custom Post Parameters](#custom-post-parameters)
   * [Updating the Component's Properties](#updating-the-components-properties)
 * [Callbacks](#callbacks)
 * [Server Example](#server-example)

## Usage
The component is initialized with a configuration object. Optional are a list of event handlers and a configuration object for dropzone.js.

If you are using one of the many module solutions, you can simply install and require this component like shown below. The package's main entry point is `lib/dropzone.js`, which gives you all the dropzone components. If you're rolling with ES6/ES2015, feel free to use `src/dropzone.js`. If you don't want any trouble at all, just add `dist/dropzone.min.js` as a script to your app and use `<DropzoneComponent />`.

> :warning: Ensure that React and ReactDOM are global variables, so that they can be reached on `window.React` or `globa.React`. Many fancy boilerplates are overly fancy and somehow remove those variables.
>
> If you are using a fancy boilerplate, you might want to require the lib directly, by using `import DropzoneComponent from 'react-dropzone-component/lib/react-dropzone'` or `require('react-dropzone-component/lib/react-dropzone')`.

Please ensure that you also include two required CSS files: `node_modules/react-dropzone-component/styles/filepicker.css` and `node_modules/dropzone/dist/min/dropzone.min.css`. There are currently a bunch of good ways to combine and process CSS in React, so I'll leave it to you to choose whatever method is best for you - the component does not automatically load CSS.

> To use this component without React-DOM, use version `^0.6` - from `0.7` on, we need it.

```
npm install react-dropzone-component
```

```js
import React from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';

var componentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true,
    postUrl: '/uploadHandler'
};

ReactDOM.render(
    <DropzoneComponent config={componentConfig}
                       eventHandlers={eventHandlers}
                       djsConfig={djsConfig} />,
    document.getElementById('content')
);
```

The configuration allows you to disable the display of CSS file type icons and to set the URL to which uploads should be posted.

##### Accessing the Dropzone Object
There are a bunch of operations that might require accessing the dropzone object, especially when wanting to call [dropzone methods](http://www.dropzonejs.com/#dropzone-methods).

To get said object, use the `init` event, whose callback will receive a reference to the dropzone object as a parameter.

```js
var myDropzone;

function initCallback (dropzone) {
    myDropzone = dropzone;
}

function removeFile () {
    if (myDropzone) {
        myDropzone.removeFile();
    }
}
```

##### Usage Without Automatic Posting
If you want to use this component without posting automatically to a URL but instead do the posting yourself, then you can just fill the `postUrl` option with a meaningless string and handle the displaying of progress by yourself using the provided event handlers. To see this in action, check out the `examples`!

```js
var componentConfig = { postUrl: 'no-url' };
var djsConfig = { autoProcessQueue: false }
var eventHandlers = { addedfile: (file) => console.log(file) }

ReactDOM.render(
    <DropzoneComponent config={componentConfig}
                       eventHandlers={eventHandlers}
                       djsConfig={djsConfig} />,
    document.getElementById('content')
);
```

##### Custom Preview Template
The djsconfig property is compatible with all of the options in the official [DropzoneJS documentation](http://www.dropzonejs.com/#layout). Updating the preview template can be done as follows:

```js
var ReactDOMServer = require('react-dom/server');

var djsConfig = {
  previewTemplate: ReactDOMServer.renderToStaticMarkup(
    <div className="dz-preview dz-file-preview">
      <div className="dz-details">
        <div className="dz-filename"><span data-dz-name="true"></span></div>
        <img data-dz-thumbnail="true" />
      </div>
      <div className="dz-progress"><span className="dz-upload" data-dz-uploadprogress="true"></span></div>
      <div className="dz-success-mark"><span>✔</span></div>
      <div className="dz-error-mark"><span>✘</span></div>
      <div className="dz-error-message"><span data-dz-errormessage="true"></span></div>
    </div>
  )
}
```

##### Custom Post Parameters
To add custom parameters to your request, add a `params` property to your Dropzone.js configuration object.

```js
var djsConfig = {
    addRemoveLinks: true,
    params: {
        myParameter: "I'm a parameter!"
    }
};

var componentConfig = {
    postUrl: '/uploadHandler'
};

ReactDOM.render(<DropzoneComponent config={componentConfig} djsConfig={djsConfig} />, document.getElementById('content'));
```

### Custom Dropzone Area

In case you need to customize the dropzone area, you may pass a jQuery compatible selector in the config object.

```js
var componentConfig = {
    postUrl: '/uploadHandler',
    dropzoneSelector: 'body',
};

ReactDOM.render(
  <DropzoneComponent config={componentConfig} />,
  document.getElementById('content'),
);
```

The code above will use the entire page `body` as the dropzone area.

### Callbacks
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
    queuecomplete: null
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

#### Updating the Component's Properties
This React Component is a wrapper around Dropzone.js - meaning that Dropzone.js is not aware of the React component life cycle. When you update the component's properties, we will use a copy of jQuery's `extend` method ([see documentation](https://api.jquery.com/jquery.extend/)) to merge new options into the Dropzone's properties object.

If you want to fundamentally change things about your dropzone, we recommend that you either modify the Dropzone object directly or destroy and recreate the component.

## Server Example
This component comes with a small server example. To try it out, simply run `npm install` and `npm start` from the `example` folder. Visit `http://localhost:8000/example/` to see the uploads working.

To check out the (super small) source code for this simple upload-accepting server, check out `example/src-server/` and `example/server.js`. **The component works with any server infrastructure, though!**

## License
MIT. For details, please consult `README.md`.
