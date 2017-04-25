const React = require('react')
const createReactClass = require('create-react-class')

const Icon = createReactClass({
  render: function () {
    return <div data-filetype={this.props.filetype} className='filepicker-file-icon' />
  }
})

module.exports = Icon
