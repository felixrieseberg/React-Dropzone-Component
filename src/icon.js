'use strict';

var React = require('react'),
    createReactClass = require('create-react-class');

var Icon = createReactClass({
    render: function () {
        return (
            <div data-filetype={this.props.filetype} className="filepicker-file-icon" />
        );
    }
});

module.exports = Icon;
