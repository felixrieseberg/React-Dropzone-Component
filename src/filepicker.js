'use strict';
import React from 'react';
import Dropzone from 'dropzone';

class ReactPicker extends React.Component {

  componentDidMount: function() {
  	
  	this.dropzone = new Dropzone(this.getDOMNode(), options);

    return {
      isDragActive: false
    }
  },

  render: function () {
        return (
            <div />
        );
    }
};

module.exports = ReactPicker;
