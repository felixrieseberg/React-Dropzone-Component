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
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks("grunt-jscs");

    grunt.registerTask('default', ['browserify', 'express:test', 'watch']);
    grunt.registerTask('test', ['jscs']);
};