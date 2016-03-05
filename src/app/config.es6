'use strict';

export default function($stateProvider, $urlRouterProvider, $httpProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/game');

  $stateProvider.state('game', {
    url: '/game',
    templateUrl: 'app/game/game.html',
    controller: 'GameCtrl'
  });

  $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}
