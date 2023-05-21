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

//inheritance using Object.create()
const StudentProto = Object.create(PersonProto);
//adding a method to StudentProto class
StudentProto.init = function (name, birthYear, course) {
  PersonProto.init.call(this, name, birthYear);
  this.course = course;
};

StudentProto.introdue = function () {
  console.log(`my name is ${this.name} and i studied ${this.course}`);
};
//creating an instance of StudentProto class
const adeyemi = Object.create(StudentProto);
adeyemi.init('adeyemi', 2010, 'Computer Science');
console.log(adeyemi);
adeyemi.introdue();
adeyemi.calcAge();
