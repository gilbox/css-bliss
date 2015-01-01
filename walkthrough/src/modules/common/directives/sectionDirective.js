'use strict';

module.exports = /*@ngInject*/
  function sectionDirective(/* inject dependencies here, i.e. : $rootScope */) {
    return {
      restrict: 'EA',
      link: function (scope, element) {
        element.addClass('markdown-body');
      }
    };
  };
