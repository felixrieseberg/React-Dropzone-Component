'use strict';

var React = require('react');
var Dropzone = require('dropzone');

var Helpers = require('./helpers');
var IconComponent = require('./icon');

var DropzoneComponent = React.createClass({
    /**
     * Defaults for the configuration of Dropzone
     * Overriden by the 'djsConfig' property
     * For a full list of possible configurations,
     * please consult
     * http://www.dropzonejs.com/#configuration
     */
    djsConfigDefaults: function () {
        return {
            url: this.props.config.postUrl,
            headers: {
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With, X-PINGOTHER, X-File-Name, Cache-Control',
                'Access-Control-Allow-Methods': 'PUT, POST, GET, OPTIONS',
                'Access-Control-Allow-Origin': '*'
            },
            withCredentials: true
        }
    },

    /**
     * React 'componentDidMount' method
     * Sets up dropzone.js with the component.
     */
    componentDidMount: function() {
        var self = this,
            options;

        if (!this.props.config.postUrl) {
            throw new Error('postUrl is a required react property for this component');
        }

        if (this.props.djsConfig) {
            options = Helpers.extend(true, {}, this.djsConfigDefaults(), this.props.djsConfig);
        } else {
            options = this.djsConfigDefaults;
        }
        
        Dropzone.autoDiscover = false;
        this.dropzone = new Dropzone(React.findDOMNode(self), options);
        this.setupEvents();
    },

    /**
     * React 'componentWillUnmount'
     * Removes dropzone.js (and all its globals) if the component is being unmounted
     */
    componentWillUnmount: function() {
        this.dropzone.destroy();
    },

    /**
     * React 'render'
     */
    render: function() {
        var icon = (this.props.fileicon) ? <IconComponent filetype='txt' /> : null;

        return (
            <div className='filepicker dropzone'>
                {icon}
            </div>
        );
    },

    /**
     * Takes event handlers in this.props.eventHandlers
     * and binds them to dropzone.js events
     */
    setupEvents: function() {
        var eventHandlers = this.props.eventHandlers;

        if (!this.dropzone) {
            return false;
        }

        for (let eventHandler in eventHandlers) {
            if (eventHandlers.hasOwnProperty(eventHandler) && eventHandlers[eventHandler]) {
                // Check if there's an array of event handlers
                if (Object.prototype.toString.call(eventHandlers[eventHandler]) === '[object Array]') {
                    for (let i = 0; i < eventHandlers[eventHandler].length; i = i + 1) {
                        this.dropzone.on(eventHandler, eventHandlers[eventHandler][i]);
                    };
                } else {
                    this.dropzone.on(eventHandler, eventHandlers[eventHandler]);
                }
            }
        }
    }
});

module.exports = DropzoneComponent;