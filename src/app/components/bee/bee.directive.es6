'use strict';

angular.module('main').directive('bee', [() => {
  return {
    restrict: 'E',
    scope: {
      type: '@'
    },
    link(scope) {

    }
  };
}]);
