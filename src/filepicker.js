'use strict';

var React = require('react');
var Dropzone = require('dropzone');
var Helpers = require('./helpers');
var IconComponent = require('./icon');

class ReactFilePicker extends React.Component {

    componentDidMount() {
        var self = this;

        if (!this.props.config.postUrl) {
            throw new Error('postUrl is a required react property for this component');
        }

        let options = {
            url: this.props.config.postUrl,
            headers: {
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With, X-PINGOTHER, X-File-Name, Cache-Control',
                'Access-Control-Allow-Methods': 'PUT, POST, GET, OPTIONS',
                'Access-Control-Allow-Origin': '*'
            },
            withCredentials: true
        };

        this.dropzone = new Dropzone(React.findDOMNode(self), options);
        Dropzone.autoDiscover = false;
    }

    componentWillUnmount() {
        this.dropzone.destroy();
    }

    render() {
        var icon = (this.props.fileicon) ? < IconComponent filetype = 'txt' / > : null;

        return (
            <div className='filepicker dropzone'> 
                {icon}
            </div>
        );
    }
};

module.exports = ReactFilePicker;