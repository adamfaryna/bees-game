'use strict';
/* exported componentsPath, bee */
import {componentsPath, bee} from '../../constans';

export default function(componentsPath, bee) {
  'ngInject';

  return {
    restrict: 'E',
    scope: {
      bee: '='
    },
    templateUrl: componentsPath + 'bee/bee.template.html',
    link(scope) {
      scope.$on('hit-bee', (beeId) => {
        if (bee.id === beeId) {
          bee.hit();
        }
      });
    }
  };
}
