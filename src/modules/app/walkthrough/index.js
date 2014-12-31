'use strict';

module.exports =
  angular.module('fsg.walkthrough', [
    require('../../common/directives').name
  ])
    .directive('walkthrough', require('./walkthroughDirective'));
