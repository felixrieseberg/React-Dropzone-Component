/* global jest, describe, it, expect */

jest.dontMock('../icon')

const React = require('react')
const ReactDOM = require('react-dom')
const { shallow, mount, render } = require('enzyme')

const { Icon } = require('../icon')

describe('Icon Comoponent', () => {
  it('Renders an Icon', () => {
    // Render a checkbox with label in the document
    const wrapper = render(<Icon filetype='PNG' />)

    // Verify that it's Off by default
    expect(wrapper[0].attribs['data-filetype']).toBeTruthy()
  })
})
