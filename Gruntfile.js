module.exports = function (grunt) {

    grunt.initConfig({
        watch: {
            browserify: {
                files: ['src/**/*.js', 'example.js'],
                tasks: ['browserify:dev']
            },
            options: {
                nospawn: true,
                livereload: true
            }
        },

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
            },

            prod: {
                src: 'src/dropzone.js',
                dest: 'built/dropzone.js',
                options: {
                    debug: true,
                    extensions: ['.js'],
                    transform: [
                        ['reactify', {
                            'es6': true,
                            'target': 'es5'
                        }]
                    ]
                }
            }
        },

        uglify: {
            prod: {
                files: {
                    'built/dropzone.min.js': ['built/dropzone.js']
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
    grunt.loadNpmTasks('grunt-contrib-uglify');    
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks("grunt-jscs");

    grunt.registerTask('default', ['browserify', 'express:test', 'watch']);
    grunt.registerTask('test', ['jscs']);
    grunt.registerTask('build', ['browserify:prod', 'uglify:prod']);
};