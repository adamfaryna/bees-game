'use strict';

angular.module('main').controller('GameCtrl', ['$scope', '$timeout', 'beeService', ($scope, $timeout, beeService) => {
  $scope.hitBee = () => {
    beeService.hitBee();
  };

  $scope.bees = beeService.getBees();

  $timeout(() => {
    $scope.beginGamePopupControl = true;
  }, 50);
}]);
