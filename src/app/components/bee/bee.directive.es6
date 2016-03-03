'use strict';

angular.module('main').directive('snBee', ['componentsPath', 'bee', 'beeService', (componentsPath, bee, beeService) => {
  return {
    restrict: 'E',
    scope: {
      bee: '='
    },
    templateUrl: componentsPath + 'bee/bee.template.html',
    link(scope, elm, attrs) {
      scope.$on('hit-bee', (beeId) => {
        if (bee.id === beeId) {
          bee.hit();
        }
      });
    }
  };
}]);
