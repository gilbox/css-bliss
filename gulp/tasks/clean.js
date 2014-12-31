'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var rimraf = require('gulp-rimraf');

module.exports = gulp.task('clean', function () {
  return gulpif(release, gulp.src(RELEASE_FOLDER, {read: false}), gulp.src(BUILD_FOLDER, {read: false}))
    .pipe(rimraf());
});
