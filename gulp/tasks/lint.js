'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

module.exports = gulp.task('lint', function () {
  return gulp.src(config.paths.src.scripts)
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});
