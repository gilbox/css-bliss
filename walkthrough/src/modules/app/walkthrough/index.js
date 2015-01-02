'use strict';

module.exports =
  angular.module('bliss.walkthrough', [
    require('../../common/directives').name
  ])
    .directive('walkthrough', require('./walkthroughDirective'));
