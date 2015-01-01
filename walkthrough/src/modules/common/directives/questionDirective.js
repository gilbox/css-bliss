'use strict';

module.exports = /*@ngInject*/
  function questionsDirective(/* inject dependencies here, i.e. : $rootScope */) {
    return {
      restrict: 'EA',
      require: '^questions',
      link: function (scope, element, attr, ctrl) {
        element.addClass('Questions-q');
        ctrl.registerQuestionElement(element);
      }
    };
  };
