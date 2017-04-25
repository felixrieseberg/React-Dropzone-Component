import React from 'react'

export class Icon extends React.Component {
  render () {
    return <div data-filetype={this.props.filetype} className='filepicker-file-icon' />
  }
}
