'use strict';

export default function($scope, $timeout, beeService) {
  'ngInject';

  $scope.hitBee = () => {
    beeService.hitBee();
  };

  $scope.bees = beeService.getBees();

  $timeout(() => {
    $scope.beginGamePopupControl = true;
  }, 50);
}
