'use strict';

module.exports = /*@ngInject*/
  function answerToggleDirective(/* inject dependencies here, i.e. : $rootScope */) {
    return {
      restrict: 'EA',
      scope: {
        correct: '@'
      },
      transclude: true,
      link: function (scope, element) {
        var statementIsTrue = scope.correct === 'true' || scope.correct === true;

        scope.isWrong = false;
        scope.isRight = false;
        scope.isOn = false;
        scope.clicked = false;

        function check() {
          if (scope.clicked) {
            scope.isRight = (statementIsTrue === scope.yesOn);
            scope.isWrong = ! scope.isRight;
          }
        }

        scope.clickYes = function () {
          console.log("clickYes");
          scope.clicked = true;
          scope.noOn = false;
          scope.yesOn = true;
          check();
        };

        scope.clickNo = function () {
          scope.clicked = true;
          scope.noOn = true;
          scope.yesOn = false;
          check();
        };
      },
      template: '<div class="AnswerToggle" ng-class="{isWrong:isWrong, isRight:isRight, isOn:isOn}" ng-click="click()">' +
                  '<span class="AnswerToggle-answer" ng-transclude></span>' +
                  '<span class="AnswerToggle-buttons">' +
                    '<button ng-click="clickYes()" class="AnswerToggle-btn AnswerToggle-btn--yes" ng-class="{isOn:yesOn}">YES</button>' +
                    '<button ng-click="clickNo()" class="AnswerToggle-btn AnswerToggle-btn--no" ng-class="{isOn:noOn}">NO</button>' +
                  '</span>' +
                '</div>'
    };
  };
