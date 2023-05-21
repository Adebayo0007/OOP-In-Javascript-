'use strict';

const account = {
  owner: 'Adebayo',
  movements: [23, 54, 453, 351],

  //   get latest() {
  //     return this.movements[this.movements.length - 1];
  //   },  OR

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(move) {
    this.movements.push(move);
  },
};

//asigning value to latest to set it
account.latest = 12;
console.log(account.latest);
console.log(account.movements);
