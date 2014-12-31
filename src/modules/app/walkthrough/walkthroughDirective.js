'use strict';

module.exports = /*@ngInject*/
  function walkthroughDirective() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'app/walkthrough/index.html',
      link: function (scope, element) {
        // Do something awesome
      }
    };
  };
