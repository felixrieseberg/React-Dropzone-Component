/* global jest, describe, it, expect */

jest.dontMock('../react-dropzone')

const React = require('react')
const ReactDOM = require('react-dom')
const { shallow, mount, render } = require('enzyme')

const {DropzoneComponent} = require('../react-dropzone')

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
    const wrapper = mount(
      <DropzoneComponent config={componentConfig} />
    )

    // Verify that the Dropzone is attached
    expect(wrapper.find('DropzoneComponent').instance()).toHaveProperty('dropzone')
  })

  it('Provides DropzoneJS with the correct postUrl', () => {
    const wrapper = mount(
      <DropzoneComponent config={componentConfig} />
    )

    const dropzone = wrapper.find('DropzoneComponent').instance().dropzone

    expect(dropzone.options.url).toEqual('http://fakeuploader.com/uploadHandler')
  })

  it('Renders Icons if configured to do so', () => {
    const wrapper = mount(
      <DropzoneComponent config={componentConfig} />
    )

    const icons = wrapper.find('.filepicker-file-icon')

    expect(icons.length).toEqual(3)
  })

  it('Provides DropzoneJS with a configuration object', () => {
    const wrapper = mount(
      <DropzoneComponent config={componentConfig} djsConfig={djsConfig} />
    )

    const dropzoneNode = wrapper.find('DropzoneComponent').instance()

    expect(dropzoneNode.dropzone.options.maxFiles).toEqual(10)
    expect(dropzoneNode.dropzone.options.maxFilesize).toEqual(2)
    expect(dropzoneNode.dropzone.options.acceptedFiles).toEqual('image/*')
  })

  it('Calls callbacks', () => {
    const eventHandler = jest.genMockFunction()

    const eventHandlers = {
      init: eventHandler
    }

    mount(
      <DropzoneComponent config={componentConfig} eventHandlers={eventHandlers} />
    )

    expect(eventHandler).toBeCalled()
  })

  it('Allows custom dropzone areas', () => {
    mount(
      <DropzoneComponent config={{ ...componentConfig, dropzoneSelector: 'body' }} />
    )

    expect(document.body.dropzone).toBeDefined()
  })
})
