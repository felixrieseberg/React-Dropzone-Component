'use strict';

jest.dontMock('../icon');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const Icon = require('../icon');

describe('Icon Comoponent', function()  {

  it('Renders an Icon', function()  {

    // Render a checkbox with label in the document
    var icon = TestUtils.renderIntoDocument(
      React.createElement(Icon, {filetype: "PNG"})
    );

    var iconNode = ReactDOM.findDOMNode(icon);

    // Verify that it's Off by default
    expect(iconNode._attributes['data-filetype']).toBeTruthy()
  });

});
