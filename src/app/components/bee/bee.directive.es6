'use strict';
/* exported componentsPath */
import {componentsPath} from '../../constans';

export default function(componentsPath) {
  'ngInject';

  return {
    restrict: 'E',
    scope: {
      bee: '='
    },
    templateUrl: componentsPath + 'bee/bee.template.html',
    link(scope, element) {
      let imgElem = $('.img', element);

      scope.$watch('bee.life', (newValue) => {
        if (newValue === 0) {
          imgElem.addClass('dead');

        } else {
          imgElem.removeClass('dead');
        }
      });
    }
  };
}
