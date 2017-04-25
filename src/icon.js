import React from 'react'

export default class Icon extends React.Component {
  render () {
    return <div data-filetype={this.props.filetype} className='filepicker-file-icon' />
  }
}
