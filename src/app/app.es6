'use strict';

angular.module('main', ['ui.router'])
  .config(require('./config').default)
  .constant('componentsPath', require('./constans').componentsPath)
  .constant('bee', require('./constans').bee)
  .directive('snBee', require('./components/bee/bee.directive').default)
  .directive('snPopup', require('./components/popup/popup.directive').default)
  .controller('GameCtrl', require('./game/game.controller').default)
  .factory('beeService', require('./service/bee.service').default)
  .service('popupService', require('./service/popup.service').default);
