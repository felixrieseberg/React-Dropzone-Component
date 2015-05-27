'use strict';

var React = require('react');
    
var Icon = React.createClass({displayName: "Icon",
    render: function () {
        return (
            React.createElement("div", {"data-filetype": this.props.filetype, className: "filepicker-file-icon"})
        );
    }
});

module.exports = Icon;
