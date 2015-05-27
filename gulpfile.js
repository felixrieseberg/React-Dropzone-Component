var browserify = require('browserify')
var del = require('del')
var gulp = require('gulp')
var source = require('vinyl-source-stream')

var header = require('gulp-header')
var jshint = require('gulp-jshint')
var rename = require('gulp-rename')
var plumber = require('gulp-plumber')
var react = require('gulp-react')
var streamify = require('gulp-streamify')
var uglify = require('gulp-uglify')
var gutil = require('gulp-util')

var pkg = require('./package.json')
var devBuild = gutil.env.release ? '' : ' (dev build at ' + (new Date()).toUTCString() + ')'
var distHeader = '/*!\n\
 * <%= pkg.name %> <%= pkg.version %><%= devBuild %> - <%= pkg.homepage %>\n\
 * <%= pkg.license %> Licensed\n\
 */\n'

var jsSrcPaths = './src/**/*.js*'
var jsLibPaths = './lib/**/*.js'

gulp.task('clean-lib', function(cb) {
  del(jsLibPaths, cb)
})

gulp.task('transpile-js', ['clean-lib'], function() {
  return gulp.src(jsSrcPaths)
    .pipe(plumber())
    .pipe(react({harmony: true}))
    .pipe(gulp.dest('./lib'))
})

gulp.task('lint-js', ['transpile-js'], function() {
  return gulp.src(jsLibPaths)
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
})

gulp.task('bundle-js', ['lint-js'], function() {
  var b = browserify(pkg.main, {
    debug: !!gutil.env.debug
  , standalone: pkg.standalone
  , detectGlobals: false
  })
  b.transform('browserify-shim')

  var stream = b.bundle()
    .pipe(source('dropzone.js'))
    .pipe(streamify(header(distHeader, {pkg: pkg, devBuild: devBuild})))
    .pipe(gulp.dest('./dist'))

  if (gutil.env.production) {
    stream = stream
      .pipe(rename('dropzone.min.js'))
      .pipe(streamify(uglify()))
      .pipe(streamify(header(distHeader, {pkg: pkg, devBuild: devBuild})))
      .pipe(gulp.dest('./dist'))
  }

  return stream
})

gulp.task('watch', function() {
  gulp.watch(jsSrcPaths, ['bundle-js'])
})

gulp.task('default', ['bundle-js', 'watch'])