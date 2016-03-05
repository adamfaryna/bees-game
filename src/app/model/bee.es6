'use strict';

import {bee} from '../constans';

export class Bee {
  constructor(id, beeObj) {
    this.id = id;
    this.spec = beeObj;
    this.life = beeObj.life;
  }

  hit() {
    this.life -= this.spec.damage;
  }
}

export class BeeWorker extends Bee {
  constructor(id) {
    super(id, bee.worker);
  }
}

export class BeeQueen extends Bee {
  constructor(id) {
    super(id, bee.queen);
  }
}

export class BeeDrone extends Bee {
  constructor(id) {
    super(id, bee.drone);
  }
}
