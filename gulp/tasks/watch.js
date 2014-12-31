'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var livereloadServer = livereload(config.ports.livereloadServer);

module.exports = gulp.task('watch', function () {
  gulp.watch(config.paths.src.livereload).on('change', function (file) {
    livereloadServer.changed(file.path);
  });

  watch({ glob: [config.paths.src.scripts]}, ['lint']);
  watch({ glob: [config.paths.src.index]}, ['index']);
  watch({ glob: [config.paths.src.templates, config.paths.src.templatesHTML]}, ['templates']);
  watch({ glob: [config.paths.src.stylesGlob]}, ['styles']);
});
