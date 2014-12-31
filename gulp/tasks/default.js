'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

module.exports = gulp.task('default', function () {
  if (release) {
    runSequence(
      'clean',
      ['index', 'styles', 'images', 'assets', 'templates', 'lint'],
      'browserify',
      ['minify', 'serve']
    );
  } else {
    runSequence(
      'clean',
      ['index', 'styles', 'images', 'assets', 'templates', 'lint'],
      ['watchify', 'watch', 'serve']
    );
  }
});
