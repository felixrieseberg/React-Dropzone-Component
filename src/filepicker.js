'use strict';

var React = require('react');
var Dropzone = require('dropzone');
var Helpers = require('./helpers');
var IconComponent = require('./icon');

class ReactPicker extends React.Component {

  componentDidMount() {
  	this.dropzone = new Dropzone(React.findDOMNode());
  }

  componentWillUnmount() {
     this.dropzone.destroy();
  }

  render() {
        var icon = (this.props.fileicon) ? <IconComponent filetype="txt" /> : null;

        return (
            <div className="filepicker">
                {icon}
            </div>
        );
  }
};

module.exports = ReactPicker;