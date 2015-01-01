'use strict';

module.exports =
  angular.module('fsg.common.directives', [])
  .directive('answerToggle', require('./answerToggleDirective'))
  .directive('section', require('./sectionDirective'))
  .directive('questions', require('./questionsDirective'))
  .directive('question', require('./questionDirective'));
