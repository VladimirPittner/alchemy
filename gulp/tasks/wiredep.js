'use strict';

var gulp = require('gulp-help')(require('gulp'));
var wiredep = require('wiredep').stream;
var plumber = require('gulp-plumber');

var config = require('./../config.js');
var handleError = require('./../utils/handleError.js');

// Inject bower components to sass
gulp.task('wiredep:sass', 'Inject Bower dependencies to Sass', function() {
  return gulp.src(config.wiredep.sass.src)
    .pipe(plumber(handleError))
    .pipe(wiredep(config.wiredep.sass.cfg))
    .pipe(gulp.dest(config.wiredep.sass.dest));
});

// Inject bower components to pug
gulp.task('wiredep:pug', 'Inject Bower dependencies to pug', function() {
  return gulp.src(config.wiredep.pug.src)
    .pipe(plumber(handleError))
    .pipe(wiredep(config.wiredep.pug.cfg))
    .pipe(gulp.dest(config.wiredep.pug.dest));
});

// Inject bower components to pug
gulp.task('wiredep:light:pug', 'Inject Bower dependencies to pug', function() {
  return gulp.src(config.wiredep.pug.srcLight)
    .pipe(plumber(handleError))
    .pipe(wiredep(config.wiredep.pug.cfgLight))
    .pipe(gulp.dest(config.wiredep.pug.destLight));
});

// Inject bower components
gulp.task('wiredep', 'Inject Bower dependencies', ['wiredep:sass','wiredep:pug', 'wiredep:light:pug']);
