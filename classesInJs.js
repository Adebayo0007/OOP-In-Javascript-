'use strict';

//class expression
const PersonCl = class {};

//class declaration

class PersonCl2 {
  constructor(firstName, lastname, fullName, dob) {
    this.firstName = firstName;
    this.lastname = lastname;
    this.dob = dob;
    this.fullName = fullName;
  }

  //implementing a getter and setter
  get age() {
    return 2023 - this.dob;
  }

  //setting a property that already exist
  set fullName(name) {
    if (name.includes(' ')) this._firstName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._firstName;
  }

  //method will be added to .prototype authomatically without messing with it so that instanciated object can access them
  calcAge() {
    console.log(2023 - this.dob);
  }

  //static method,this are like helping method,they can only be accessed throgh the class name

  static greet() {
    console.log(`hello there my guy`);
  }
}

//accessing the static method in a class
PersonCl2.greet();

var adebayo = new PersonCl2('adebayo', 'Abdullah', 'Adebayo abdullah', 1999);
console.log(adebayo);

PersonCl2.prototype.greet = function () {
  console.log(`Hello ${this.firstName}`);
}; //method can also be added manually by using .prototype
adebayo.calcAge();
adebayo.greet();
console.log('age is; ', adebayo.age);
console.log('age is; ', adebayo.fullName);
