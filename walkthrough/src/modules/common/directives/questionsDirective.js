'use strict';

module.exports = /*@ngInject*/
  function questionsDirective(/* inject dependencies here, i.e. : $rootScope */) {
    return {
      restrict: 'EA',
      link: function (scope, element) {
        element.addClass('Questions markdown-body');
      },
      controller: function ($element, $window) {
        var elms = [];

        this.registerQuestionElement = function (elm) {
          elms.push(elm);
        };

        //angular.element($window).on('resize', function () {
        //  console.log("resize");
        //  if (elms.length) {
        //    var biggest = elms[0];
        //    var biggestHeight = 0;
        //    elms.forEach(function (elm) {
        //      elm.css('height', 'auto');
        //      if (elm.getBoundingClientRect().height > biggestHeight) {
        //        biggest = elm;
        //      }
        //    });
        //    elms.forEach(function (elm) {
        //      elm.css('height', biggestHeight+'px');
        //    });
        //  }
        //});

      }
    };
  };
