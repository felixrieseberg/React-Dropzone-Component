/* global jest, describe, it, expect */

jest.dontMock('../react-dropzone')
jest.dontMock('../helpers')

const React = require('react')
const ReactDOM = require('react-dom')
const TestUtils = require('react-dom/test-utils')

const DropzoneComponent = require('../react-dropzone')

describe('Dropzone Comoponent', () => {
  const componentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true,
    postUrl: 'http://fakeuploader.com/uploadHandler'
  }

  const djsConfig = {
    maxFilesize: 2,
    maxFiles: 10,
    acceptedFiles: 'image/*'
  }

  it('Renders a Dropzone with DropzoneJS attached', () => {
    let dropzone = TestUtils.renderIntoDocument(
      <DropzoneComponent config={componentConfig} />
    )

    let dropzoneNode = ReactDOM.findDOMNode(dropzone)

    // Verify that the Dropzone is attached
    expect(dropzoneNode.dropzone).toBeTruthy()
  })

  it('Provides DropzoneJS with the correct postUrl', () => {
    let dropzone = TestUtils.renderIntoDocument(
      <DropzoneComponent config={componentConfig} />
    )

    let dropzoneNode = ReactDOM.findDOMNode(dropzone)

    expect(dropzoneNode.dropzone.options.url).toEqual('http://fakeuploader.com/uploadHandler')
  })

  it('Renders Icons if configured to do so', () => {
    let dropzone = TestUtils.renderIntoDocument(
      <DropzoneComponent config={componentConfig} />
    )

    let dropzoneNode = ReactDOM.findDOMNode(dropzone)

    // Verify that we're dealing with the right number of children, indicating icons
    expect(dropzoneNode.childNodes.length).toEqual(4)
  })

  it('Provides DropzoneJS with a configuration object', () => {
    let dropzone = TestUtils.renderIntoDocument(
      <DropzoneComponent config={componentConfig} djsConfig={djsConfig} />
    )

    let dropzoneNode = ReactDOM.findDOMNode(dropzone)

    expect(dropzoneNode.dropzone.options.maxFiles).toEqual(10)
    expect(dropzoneNode.dropzone.options.maxFilesize).toEqual(2)
    expect(dropzoneNode.dropzone.options.acceptedFiles).toEqual('image/*')
  })

  it('Calls callbacks', () => {
    let eventHandler = jest.genMockFunction()

    let eventHandlers = {
      init: eventHandler
    }

    TestUtils.renderIntoDocument(
      <DropzoneComponent config={componentConfig} eventHandlers={eventHandlers} />
    )

    expect(eventHandler).toBeCalled()
  })

  it('Allows custom dropzone areas', () => {
    TestUtils.renderIntoDocument(
      <DropzoneComponent config={{ ...componentConfig, dropzoneSelector: 'body' }} />
    )

    expect(document.body.dropzone).toBeDefined()
  })
})
