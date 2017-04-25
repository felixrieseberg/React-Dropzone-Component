'use strict';

var createReactClass = require('create-react-class');

var Icon = createReactClass({
    render: function () {
        return (
            React.createElement("div", {"data-filetype": this.props.filetype, className: "filepicker-file-icon"})
        );
    }
});

module.exports = Icon;
