'use strict';
var React = require('react');

var Helpers = require('./helpers');
var IconComponent = require('./icon');

var Filepicker = React.createClass({

    render: function () {
        var icon = (this.props.fileicon) ? <IconComponent filetype="txt" /> : null;

        return (
            <div className="filepicker">
                {icon}
            </div>
        );
    }

});

module.exports = Filepicker;
