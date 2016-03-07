'use strict';

export default function($scope, $timeout, beeService, popupService) {
  'ngInject';

  let welcomePopupHeader = '<h2>Hi, wanna play a game?</h2>';
  let endGameHeaders = {
    queenKilled: '<h2>Congratulations! You killed Queen bee!</h2>',
    allBeesKilled: '<h2>Congratulations! You killed all bees!</h2>'
  };

  $timeout(() => {
    startGame();
  }, 50);

  $scope.hitBee = () => {
    beeService.hitBee($scope);
  };

  function startGame() {
    popupService.show(welcomePopupHeader, $scope);
    $scope.bees = beeService.getBees();
  }

  function finishGame(message) {
    popupService.show(message, $scope, () => {
      beeService.refreshBees();
    });
  }

  $scope.$on('queen-killed', () => {
    finishGame(endGameHeaders.queenKilled);
  });

  $scope.$on('all-bees-killed', () => {
    finishGame(endGameHeaders.allBeesKilled);
  });
}
