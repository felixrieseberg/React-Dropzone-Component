'use strict';

var React = require('react');
    
var Icon = React.createClass({
    render: function () {
        return (
            <div data-filetype={this.props.filetype} className="filepicker-file-icon" />
        );
    }
});

module.exports = Icon;
