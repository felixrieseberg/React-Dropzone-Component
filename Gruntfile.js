module.exports = function (grunt) {

    grunt.initConfig({
        browserify: {
            serve: {
                src: 'example/example_default.js',
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
            },

            params: {
                src: 'example/example_params.js',
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

        express: {
            options: {
                port: 8000,
                background: false,
            },
            serve: {
              options: {
                script: 'server.js'
              }
            }
        }
    })

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-express-server');

    grunt.registerTask('default', ['browserify:serve', 'express:serve']);
    grunt.registerTask('params', ['browserify:params', 'express:serve']);
};