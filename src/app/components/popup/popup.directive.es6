'use strict';

/* exported componentsPath */
import {componentsPath} from '../../constans';

export default function($document, componentsPath) {
  'ngInject';

  return {
    restrict: 'E',
    transclude: true,
    scope: {
      open: '@'
    },
    templateUrl: componentsPath + 'popup/popup.template.html',
    link(scope, el) {
      let body = $document.find('body');

      scope.$watch('open', (newVal) => {
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
}
