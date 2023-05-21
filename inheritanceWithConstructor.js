'use strict';
const Person = function (firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
};
Person.prototype.myFullName = function () {
  return `my full name is ${this.firstName} ${this.lastName}`;
};

const Student = function (firstName, lastName, course) {
  //   this.firstName = firstName;
  //   this.lastName = lastName;   instead you use the following to inherit
  Person.call(this, firstName, lastName);
  this.course = course;
};

//so as to let the available function in parent class be a accessble by the student instances we have to do the following
//and this have to be done before adding prototype methods to the student class
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`my name is ${this.firstName},i studied ${this.course}`);
};

const ade = new Student('ade', 'tijani', 'Computer Science');
ade.introduce();

//this hoe student instance is able to access the method in person class;
console.log(ade.myFullName());
