'use strict';

angular.module('main').factory('beeService', ['bee', function(bee) {
  class Bee {
    constructor(id, beeObj) {
      this.id = id;
      this.spec = beeObj;
      this.life = beeObj.life;
    }

    hit() {
      this.life -= this.spec.damage;
    }
  }

  class BeeWorker extends Bee {
    constructor(id) {
      super(id, bee.worker);
    }
  }

  class BeeQueen extends Bee {
    constructor() {
      super(id, bee.queen);
    }
  }

  class BeeDrone extends Bee {
    constructor() {
      super(id, bee.drone);
    }
  }

  let bees = {
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

  return {
    getBees() { return bees },
    getBee(beeId) { return bees[beeId]; },
    hitBee(scope) { scope.$emit('hit-bee', bees[Math.floor(Math.random() * bees.length)]); }
  };
}]);
