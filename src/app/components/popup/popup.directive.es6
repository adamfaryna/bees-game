'use strict';

angular.module('main').directive('snPopup', ['$document', 'componentsPath', ($document, componentsPath) => {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      open: '@'
    },
    templateUrl: componentsPath + 'popup/popup.template.html',
    link(scope, el, attrs) {
      let body = $document.find('body');

      scope.$watch('open', (newVal) => {
        console.log('aaaa');

        if (newVal === 'true') {
          el.addClass('show');
          body.addClass('stop-scrolling');

        } else {
          el.removeClass('show');
          body.removeClass('stop-scrolling');
        }
      });
    }
  };
}]);
