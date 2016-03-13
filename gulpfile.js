var del       = require('del');
var gulp      = require('gulp');
var webpack   = require('webpack-stream');

var header    = require('gulp-header');
var jshint    = require('gulp-jshint');
var rename    = require('gulp-rename');
var plumber   = require('gulp-plumber');
var react     = require('gulp-react');
var streamify = require('gulp-streamify');
var uglify    = require('gulp-uglify');
var gutil     = require('gulp-util');

var pkg = require('./package.json');
var devBuild = gutil.env.release ? '' : ' (dev build at ' + (new Date()).toUTCString() + ')';
var distHeader = '/*!\n\
 * <%= pkg.name %> <%= pkg.version %><%= devBuild %> - <%= pkg.homepage %>\n\
 * Copyright (C) Felix Rieseberg <felix@felixrieseberg.com>\n\
 * <%= pkg.license %> Licensed\n\
 */\n';

var jsSrcPaths = './src/*.js';
var jsLibPaths = './lib/**/*.js';

gulp.task('clean-lib', function(cb) {
    del('./lib', cb);
});

gulp.task('transpile-js', ['clean-lib'], function() {
    return gulp.src(jsSrcPaths)
        .pipe(plumber())
        .pipe(react({
            harmony: true
        }))
        .pipe(gulp.dest('./lib'));
});

gulp.task('lint-js', ['transpile-js'], function() {
    return gulp.src(jsLibPaths)
        .pipe(jshint('./.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('bundle-js', ['lint-js'], function() {
    var stream = gulp.src('./lib/react-dropzone.js')
        .pipe(streamify(header(distHeader, {
            pkg: pkg,
            devBuild: devBuild
        })))
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('react-dropzone.min.js'))
        .pipe(streamify(uglify()))
        .pipe(streamify(header(distHeader, {
            pkg: pkg,
            devBuild: devBuild
        })))
        .pipe(gulp.dest('./dist'));

    return stream;
});

gulp.task('watch', function() {
    gulp.watch(jsSrcPaths, ['bundle-js']);
});

gulp.task('default', ['transpile-js', 'bundle-js']);