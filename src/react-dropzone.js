'use strict';

var React = require('react'),
    ReactDOM = require('react-dom'),
    Helpers = require('./helpers'),
    IconComponent = require('./icon'),
    Dropzone, DropzoneComponent;

DropzoneComponent = React.createClass({
    /**
     * Ensure we always have props to work with.
     */
    getDefaultProps: function () {
        return {
          djsConfig: {},
          config: {},
          eventHandlers: {}
        }
    },

    /**
     * Configuration of Dropzone.js. Defaults are
     * overriden overriden by the 'djsConfig' property
     * For a full list of possible configurations,
     * please consult
     * http://www.dropzonejs.com/#configuration
     */
    getDjsConfig: function () {
        var options,
            defaults = {
                url: this.props.config.postUrl ? this.props.config.postUrl : null
            };

        if (this.props.djsConfig) {
            options = Helpers.extend(true, {}, defaults, this.props.djsConfig);
        } else {
            options = defaults;
        }

        return options;
    },

    /**
     * React 'componentDidMount' method
     * Sets up dropzone.js with the component.
     */
    componentDidMount: function () {
        var self = this,
            options = this.getDjsConfig();

        Dropzone = Dropzone || require('dropzone');
        Dropzone.autoDiscover = false;

        if (!this.props.config.postUrl && !this.props.eventHandlers.drop) {
            console.info('Neither postUrl nor a "drop" eventHandler specified, the React-Dropzone component might misbehave.');
        }

        this.dropzone = new Dropzone(ReactDOM.findDOMNode(self), options);
        this.setupEvents();
    },

    /**
     * React 'componentWillUnmount'
     * Removes dropzone.js (and all its globals) if the component is being unmounted
     */
    componentWillUnmount: function () {
        if (this.dropzone) {
            var files = this.dropzone.getActiveFiles();

            if (files.length > 0) {
                // Well, seems like we still have stuff uploading.
                // This is dirty, but let's keep trying to get rid
                // of the dropzone until we're done here.
                this.queueDestroy = true;

                var destroyInterval = window.setInterval(() => {
                    if (this.queueDestroy = false) {
                        return window.clearInterval(destroyInterval);
                    }

                    if (this.dropzone.getActiveFiles().length === 0) {
                        this.dropzone = this.dropzone.destroy();
                        return window.clearInterval(destroyInterval);
                    }
                }, 500);
            } else {
                this.dropzone = this.dropzone.destroy();
            }
        }
    },

    /**
     * React 'componentDidUpdate'
     * If the Dropzone hasn't been created, create it
     */
    componentDidUpdate: function () {
        this.queueDestroy = false;

        if (!this.dropzone) {
            this.dropzone = new Dropzone(ReactDOM.findDOMNode(this), this.getDjsConfig());
        }
    },

    /**
     * React 'componentWillUpdate'
     * Update Dropzone options each time the component updates.
     */
    componentWillUpdate: function() {
        var djsConfigObj, postUrlConfigObj;

        djsConfigObj = this.props.djsConfig ? this.props.djsConfig : {};        
        try {
            postUrlConfigObj = this.props.config.postUrl ? {url: this.props.config.postUrl} : {};            
        } catch (err) {   
            postUrlConfigObj = {};
        }
        
        this.dropzone.options = Helpers.extend(true, {}, this.dropzone.options, djsConfigObj, postUrlConfigObj);
    },

    /**
     * React 'render'
     */
    render: function () {
        var icons = [],
            files = this.state.files,
            config = this.props.config,
            className = (this.props.className) ? 'filepicker dropzone ' + this.props.className : 'filepicker dropzone';

        if (config.showFiletypeIcon && config.iconFiletypes && (!files || files.length < 1)) {
            for (var i = 0; i < this.props.config.iconFiletypes.length; i = i + 1) {
                icons.push(<IconComponent filetype={this.props.config.iconFiletypes[i]} key={"icon-component" + i} />);
            }
        }

        if (!this.props.config.postUrl && this.props.action) {
            return (
                <form action={this.props.action} className={className}>
                    {icons}
                    {this.props.children}
                </form>
            );
        } else {
            return (
                <div className={className}>
                    {icons}
                    {this.props.children}
                </div>
            );
        }
    },

    /**
     * React 'getInitialState' method, setting the initial state
     * @return {object}
     */
    getInitialState: function () {
        return {
            files: []
        }
    },

    /**
     * Takes event handlers in this.props.eventHandlers
     * and binds them to dropzone.js events
     */
    setupEvents: function () {
        var eventHandlers = this.props.eventHandlers;

        if (!this.dropzone || !eventHandlers) {
            return;
        }

        for (var eventHandler in eventHandlers) {
            if (eventHandlers.hasOwnProperty(eventHandler) && eventHandlers[eventHandler]) {
                // Check if there's an array of event handlers
                if (Object.prototype.toString.call(eventHandlers[eventHandler]) === '[object Array]') {
                    for (var i = 0; i < eventHandlers[eventHandler].length; i = i + 1) {
                        // Check if it's an init handler
                        if (eventHandler === 'init') {
                            eventHandlers[eventHandler][i](this.dropzone);
                        } else {
                            this.dropzone.on(eventHandler, eventHandlers[eventHandler][i]);
                        }
                    }
                } else {
                    if (eventHandler === 'init') {
                        eventHandlers[eventHandler](this.dropzone);
                    } else {
                        this.dropzone.on(eventHandler, eventHandlers[eventHandler]);
                    }
                }
            }
        }

        this.dropzone.on('addedfile', (file) => {
            if (file) {
                var files = this.state.files;

                if (!files) {
                    files = [];
                }

                files.push(file)

                this.setState({files: files});
            }
        });

        this.dropzone.on('removedfile', (file) => {
            if (file) {
                var files = this.state.files;

                if (files && files.length > 0) {
                    for (var i = 0; i < files.length; i++) {
                        if (files[i].name === file.name && files[i].size === file.size) {
                            files.splice(i, 1);
                        }
                    }

                    this.setState({files: files});
                }
            }
        });
    }
});

module.exports = DropzoneComponent;
