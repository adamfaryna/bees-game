'use strict';

import {bee} from '../constans';

function isBeeDead(bee) {
  return bee.life === 0;
}

export class Bee {
  constructor(id, beeObj) {
    this.id = id;
    this.spec = beeObj;
    this.life = beeObj.life;
  }

  hit() {
    this.life -= this.life < this.spec.damage ? this.life : this.spec.damage;
    return isBeeDead(this);
  }

  refresh() {
    this.life = this.spec.life;
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
