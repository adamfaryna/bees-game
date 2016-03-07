'use strict';

/* exported componentsPath */
import {componentsPath} from '../../constans';

export default function(componentsPath, popupService) {
  'ngInject';

  return {
    restrict: 'E',
    transclude: true,
    scope: {
      open: '@'
    },
    templateUrl: componentsPath + 'popup/popup.template.html',
    bindToController: false,
    controller: ($scope) => {
      'ngInject'; // jshint ignore:line
      $scope.close = popupService.close;
    }
  };
}
