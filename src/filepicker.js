'use strict';
import React from 'react';
import Dropzone from 'dropzone';
import Helpers from './helpers';
import IconComponent from './icon';

class ReactPicker extends React.Component {

  componentDidMount: function() {
  	
  	this.dropzone = new Dropzone(this.getDOMNode(), options);
  },

  render: function () {
        var icon = (this.props.fileicon) ? <IconComponent filetype="txt" /> : null;

        return (
            <div className="filepicker">
                {icon}
            </div>
        );
  }

module.exports = ReactPicker;