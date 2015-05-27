module.exports = function (grunt) {

    grunt.initConfig({
        browserify: {
            dev: {
                src: 'example.js',
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
            test: {
              options: {
                script: 'server.js'
              }
            }
        }
    })

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-express-server');

    grunt.registerTask('default', ['browserify:dev', 'express:test']);
};