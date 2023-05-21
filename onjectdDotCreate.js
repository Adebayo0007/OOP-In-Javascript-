'use strict';
const PersonProto = {
  calcAge() {
    console.log(2023 - this.birthYear);
  },

  init(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  },
};

const ade = Object.create(PersonProto);
ade.name = 'adebayo';
ade.birthYear = 1999;

ade.calcAge();
console.log(ade.__proto__ === PersonProto);

const adeyemi = Object.create(PersonProto);
adeyemi.init('adeyemi', 1999);
adeyemi.calcAge();
