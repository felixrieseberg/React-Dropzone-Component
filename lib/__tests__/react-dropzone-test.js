'use strict';

jest.dontMock('../react-dropzone');
jest.dontMock('../helpers');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const DropzoneComponent = require('../react-dropzone');

describe('Dropzone Comoponent', function()  {
  const componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.gif'],
      showFiletypeIcon: true,
      postUrl: 'http://fakeuploader.com/uploadHandler'
  };

  const djsConfig = {
    maxFilesize: 2,
    maxFiles: 10,
    acceptedFiles: 'image/*'
  };

  it('Renders a Dropzone with DropzoneJS attached', function()  {
    let dropzone = TestUtils.renderIntoDocument(
      React.createElement(DropzoneComponent, {config: componentConfig})
    );

    let dropzoneNode = ReactDOM.findDOMNode(dropzone);

    // Verify that the Dropzone is attached
    expect(dropzoneNode.dropzone).toBeTruthy()
  });

  it('Provides DropzoneJS with the correct postUrl', function()  {
    let dropzone = TestUtils.renderIntoDocument(
      React.createElement(DropzoneComponent, {config: componentConfig})
    );

    let dropzoneNode = ReactDOM.findDOMNode(dropzone);

    expect(dropzoneNode.dropzone.options.url).toEqual('http://fakeuploader.com/uploadHandler')
  });

  it('Renders Icons if configured to do so', function()  {
    let dropzone = TestUtils.renderIntoDocument(
      React.createElement(DropzoneComponent, {config: componentConfig})
    );

    let dropzoneNode = ReactDOM.findDOMNode(dropzone);

    // Verify that we're dealing with the right number of children, indicating icons
    expect(dropzoneNode.childNodes.length).toEqual(4)
  });

  it('Provides DropzoneJS with a configuration object', function()  {
    let dropzone = TestUtils.renderIntoDocument(
      React.createElement(DropzoneComponent, {config: componentConfig, djsConfig: djsConfig})
    );

    let dropzoneNode = ReactDOM.findDOMNode(dropzone);

    expect(dropzoneNode.dropzone.options.maxFiles).toEqual(10);
    expect(dropzoneNode.dropzone.options.maxFilesize).toEqual(2);
    expect(dropzoneNode.dropzone.options.acceptedFiles).toEqual('image/*');
  });

  it('Calls callbacks', function()  {
    let eventHandler = jest.genMockFunction();

    let eventHandlers = {
      init: eventHandler
    }

    let dropzone = TestUtils.renderIntoDocument(
      React.createElement(DropzoneComponent, {config: componentConfig, eventHandlers: eventHandlers})
    );

    expect(eventHandler).toBeCalled();
  });
});
