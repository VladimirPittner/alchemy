'use strict';

var gulp = require('gulp-help')(require('gulp'));
var runSequence = require('run-sequence');

var watch = require('./../utils/watchHelper.js');

// Serve project with watching and livereload

gulp.task('serve', 'Serve project with livereload and file watching',function (cb) {
  watch.setWatching(true);
  runSequence(
    'wiredep',
    ['styles','templates', 'scripts'],
    'modernizr',
    'browser-sync',
    'watch',
    cb
  );
});

gulp.task('serve:dist', 'Bulid preview', function (cb) {
  runSequence(
    'build',
    'browser-sync:dist',
    cb
  );
});
