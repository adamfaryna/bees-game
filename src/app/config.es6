'use strict'

angular.module('main').config(['$stateProvider', '$urlRouterProvider', '$httpProvider', ($stateProvider, $urlRouterProvider, $httpProvider) => {
    $urlRouterProvider.otherwise('/game');

  $stateProvider.state('game', {
    url: '/game',
    templateUrl: 'app/game/game.html',
    controller: 'GameCtrl'

  });

  $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}]);
