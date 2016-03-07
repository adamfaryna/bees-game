'use strict';
/* exported BeeWorker, BeeDrone, BeeQueen */
import {BeeWorker, BeeDrone, BeeQueen} from '../model/bee';
/* exported bee */
import {bee} from '../constans';

export default function($rootScope, bee) {
  'ngInject';

  const bees = {
    1: new BeeQueen(1),
    2: new BeeWorker(2),
    3: new BeeWorker(3),
    4: new BeeWorker(4),
    5: new BeeWorker(5),
    6: new BeeWorker(6),
    7: new BeeDrone(7),
    8: new BeeDrone(8),
    9: new BeeDrone(9),
    10: new BeeDrone(10),
    11: new BeeDrone(11),
    12: new BeeDrone(12),
    13: new BeeDrone(13),
    14: new BeeDrone(14)
  };
  let lifeBees = null;
  let lifeBeesIds = null;

  function refreshBees() {
    for (let [k, bee] of Object.entries(bees)) {  /* jshint unused:false */
      bee.refresh();
    }

    lifeBees = Object.assign({}, bees);
    lifeBeesIds = Object.keys(lifeBees);
  }

  refreshBees();

  return {
    refreshBees: refreshBees,
    getBees() { return bees; },
    getBee(beeId) { return bees[beeId]; },
    hitBee() {
      if (!bees) {
        throw Error('No bees generated');
      }

      let beeRandomId = lifeBeesIds[Math.floor(Math.random() * lifeBeesIds.length)];
      let randomBee = bees[beeRandomId];

      if (randomBee.hit()) {
        delete lifeBeesIds[beeRandomId];
        delete lifeBees[randomBee.id];
        lifeBeesIds = Object.keys(lifeBees);

        if (lifeBeesIds.length === 0) {
          $rootScope.$broadcast('all-bees-killed');

        } else if (randomBee.spec.type === bee.queen.type) {
          $rootScope.$broadcast('queen-killed');
        }
      }
    }
  };
}
