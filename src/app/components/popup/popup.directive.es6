'use strict';

/* exported componentsPath */
import {componentsPath} from '../../constans';

export default function($document, componentsPath) {
  'ngInject';

  let body = $document.find('body');

  function open() {
    this.addClass('show');
    this.addClass('stop-scrolling');
  }

  function close() {
    this.removeClass('show');
    this.removeClass('stop-scrolling');
  }

  return {
    restrict: 'E',
    transclude: true,
    scope: {
      open: '@'
    },
    templateUrl: componentsPath + 'popup/popup.template.html',
    bindToController: false,
    controller: ($scope, $element) => {
      'ngInject'; // jshint ignore:line

      $scope.close = close.bind($element);
    },
    link(scope, el) {
      scope.$watch('open', (newVal) => {
        if (newVal === 'true') {
          open.bind(el)();

        } else {
          close.bind(el)();
        }
      });
    }
  };
}
