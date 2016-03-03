'use strict'

angular.module('main')
  .constant('componentsPath', 'app/components/')
  .constant('bee', {
    queen: {
      label: 'Queen',
      type: 'queen',
      life: 100,
      damage: 8
    },
    worker: {
      label: 'Worker',
      type: 'worker',
      life: 75,
      damage: 10
    },
    drone: {
      label: 'Drone',
      type: 'drone',
      life: 50,
      damage: 12
    }
  });
