'use strict';

var React = require('react');
var Dropzone = require('dropzone');

var Helpers = require('./helpers');
var IconComponent = require('./icon');

class DropzoneComponent extends React.Component {

    /**
     * dropzone: A reference to the dropzone.js dropzone
     * @type {object}
     */
    dropzone: null,

    /**
     * Defaults for the configuration of Dropzone
     * Overriden by the 'djsConfig' property
     * For a full list of possible configurations,
     * please consult
     * http://www.dropzonejs.com/#configuration
     * @type {Object}
     */
    djsConfigDefaults: {
        url: this.props.config.postUrl,
        headers: {
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With, X-PINGOTHER, X-File-Name, Cache-Control',
            'Access-Control-Allow-Methods': 'PUT, POST, GET, OPTIONS',
            'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true
    }

    /**
     * React 'componentDidMount' method
     * Sets up dropzone.js with the component.
     */
    componentDidMount() {
        var self = this,
            options;

        if (!this.props.config.postUrl) {
            throw new Error('postUrl is a required react property for this component');
        }

        if (this.props.djsConfig) {
            options = $.extend({}, this.djsConfigDefaults, this.props.djsConfig);
        } else {
            options = this.djsConfigDefaults;
        }

        this.dropzone = new Dropzone(React.findDOMNode(self), options);
        Dropzone.autoDiscover = false;
    }

    /**
     * React 'componentWillUnmount'
     * Removes dropzone.js (and all its globals) if the component is being unmounted
     */
    componentWillUnmount() {
        this.dropzone.destroy();
    }

    /**
     * React 'render'
     */
    render() {
        var icon = (this.props.fileicon) ? <IconComponent filetype='txt' /> : null;

        return (
            <div className='filepicker dropzone'>
                {icon}
            </div>
        );
    }
};

module.exports = DropzoneComponent;