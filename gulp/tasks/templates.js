'use strict';

var gulp = require('gulp-help')(require('gulp'));
var pug = require('gulp-pug');
var data = require('gulp-data');
var changed = require('gulp-changed');
var cached = require('gulp-cached');
var pugInheritance = require('gulp-pug-inheritance');
var filter = require('gulp-filter');
var plumber  = require('gulp-plumber');
var fs = require('fs');
var extend = require('gulp-extend');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var gulpif = require('gulp-if');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var filter = require('gulp-filter');
var _ = require('lodash');

var yamlMerge = require('gulp-yaml-merge');
var yaml = require('js-yaml');
var md5File = require('md5-file');

var config = require('./../config.js');
var handleError = require('./../utils/handleError.js');
var build = require('./../utils/buildHelper.js');
var watch = require('./../utils/watchHelper.js');

var dataFileHashCache = null;
var firstRun = null;

// Compile pug to html

gulp.task('templates', 'Compile Pug templates', ['templates:prepareData', 'useref'], function() {
  var src = build.isBuild() ? config.templates.srcBuild : config.templates.src;
  var dest = build.isBuild() ? config.templates.destBuild : config.templates.dest;
  var base = build.isBuild() ? config.templates.baseBuild : config.templates.base;

  // compare data file hash with cached data file to determine if file changes
  var dataFileHash = md5File.sync(config.templatesData.dataPath);
  var isDataFileChanged = (dataFileHashCache !== null) && (dataFileHashCache !== dataFileHash);
  dataFileHashCache = dataFileHash;

  // check if this is first run of this task
  firstRun === null ? true : false;

  return gulp.src(src, { base: base })
    .pipe(plumber(handleError))
    .pipe(gulpif(watch.isWatching() && !isDataFileChanged, changed('.tmp', {extension: '.html'})))
    .pipe(gulpif(watch.isWatching() && !isDataFileChanged, cached('pug')))
    // Do not run pug-inheritance in the first run. It's not needed, because we compile
    // everything anyway and it takes too much time.
    .pipe(gulpif(watch.isWatching() && !isDataFileChanged && !firstRun, pugInheritance({basedir: config.templates.base, skip: 'node_modules'})))
    .pipe(filter(function (file) {
      return /^[^\\\/]+\.pug$/.test(file.relative) || /^styleguide[\\\/]docs[\\\/]([^\\\/]+[\\\/])*[^\\\/]+\.pug$/.test(file.relative)
    }))
    .pipe(data(function() {
      var data = yaml.safeLoad(fs.readFileSync(config.templatesData.dataPath, 'utf8'));
      var helpers = require(config.templatesData.helpersPath);
      return _.assign({}, data, helpers);
    }))
    .pipe(pug(config.templates.cfg))
    .pipe(gulp.dest(dest));
});

// Concat *.json file to single data.json

gulp.task('templates:prepareData', 'Merge views data', function() {
  return gulp.src(config.templatesData.src)
    .pipe(yamlMerge(config.templatesData.dataName))
    .pipe(gulp.dest(config.templatesData.dest));
});

// Bundle css and js based on build tags in Pug templates

gulp.task('useref', 'Bundle CSS and JS based on build tags and copy to `dist/` folder', function () {
  // run useref only in build
  if (build.isBuild()) {

    var pugFilesOnly = filter(['**/*.pug'], {restore: true});
    var excludePug = filter(['**','!**/*.pug']);

    return gulp.src(config.useref.src)
      .pipe(useref())
      .pipe(gulpif('*.js', gulpif(config.uglifyJs, uglify()))) // uglify JS
      .pipe(gulpif('*.css', gulpif(config.minifyCss, cssnano()))) // minify CSS
      .pipe(gulpif('!**/*.pug',gulpif(config.cacheBust, rev())))
      .pipe(gulpif(config.cacheBust, revReplace({replaceInExtensions: ['.pug', '.css', '.js']})))
      .pipe(pugFilesOnly)
      .pipe(gulp.dest(config.useref.destPug))
      .pipe(pugFilesOnly.restore)
      .pipe(excludePug)
      .pipe(gulp.dest(config.useref.dest))
      .pipe(gulpif(config.cacheBust, rev.manifest(config.useref.revManifestCfg))) // create rev-manifest.json
      .pipe(gulp.dest(config.useref.dest));
  } else {
    return;
  }
});
