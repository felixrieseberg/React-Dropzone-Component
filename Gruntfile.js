module.exports = function (grunt) {

    grunt.initConfig({
        watch: {
            browserify: {
                files: ['src/**/*.js', 'example.js'],
                tasks: ['browserify:dev']
            },
            options: {
                nospawn: true
            }
        },

        browserify: {
            dev: {
                src: 'example/example.js',
                dest: 'example/bundle.js',
                options: {
                    debug: true,
                    extensions: ['.js'],
                    transform: [
                        ['reactify', {
                            'es6': true
                        }]
                    ]
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 8000,
                    base: './',
                    onCreateServer: function(server, connect, options) {
                        var app = connect(),
                            multer  = require('multer');

                        app.use('/uploadHandler',[ multer({ dest: './uploads/'}), function(req, res){
                               console.log(req.body) // form fields
                               console.log(req.files) // form files
                               res.status(204).end()
                        }]);

                        console.log('/uploadHandler has been configured');
                    }
                } 
            }
        },
        jscs: {
            files: {
                src: ['src/**/*.js']
            },
            options: {
                config: '.jscsrc',
                esprima: 'esprima-fb',
                esnext: true
            }
        }
    })

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks("grunt-jscs");

    grunt.registerTask('default', ['browserify', 'connect', 'watch']);
    grunt.registerTask('test', ['jscs']);
};