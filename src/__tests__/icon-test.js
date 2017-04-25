/* global jest, describe, it, expect */

jest.dontMock('../icon')

const React = require('react')
const ReactDOM = require('react-dom')
const TestUtils = require('react-dom/test-utils')

const Icon = require('../icon')

describe('Icon Comoponent', () => {
  it('Renders an Icon', () => {
    // Render a checkbox with label in the document
    const icon = TestUtils.renderIntoDocument(<Icon filetype='PNG' />)
    const iconNode = ReactDOM.findDOMNode(icon)

    // Verify that it's Off by default
    expect(iconNode._attributes['data-filetype']).toBeTruthy()
  })
})
