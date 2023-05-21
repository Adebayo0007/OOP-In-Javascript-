'use strict';

//craeating a objec using consructor method
const Person = function (firstName, lastName, dob) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.dob = dob;

  //instead of adding a function or method inside the class we make use of 'prototype' by saying className.prototypr.<the functionName> = function(){then u perform the behaviour and u can access any of the class property by using 'this' key word} e.g instance.

  //then you access the method by saying instance.theMethodName.
};

//you can also add some static method to Person constructor(which can be accessed withe constructor name and cant be accessed by the instances amde from the constructor)
Person.greet = function () {
  console.log('hello there');
};

//Accessing the static method with Constructor name
Person.greet();

const adebayo = new Person('Adebayo', 'Abdullah', 1999);
const adeyemi = new Person('Uthman', 'Adeyemi', 2002);

console.log(adebayo, adeyemi);
//the result of the above is;
//{firstName: 'Adebayo', lastName: 'Abdullah', dob: 1999} and {firstName: 'Uthman', lastName: 'Adeyemi', dob: 2002}

console.log(adebayo instanceof Person); //to check if an instance is of particular class

console.log(Person.prototype);
//or
console.log(Person.prototype === adebayo.__proto__); //the result is true(you use class.prototype or instance.__proto__)
console.log(Person.prototype.isPrototypeOf(adebayo)); //the result is true ,to check if an instance is a prototype of an Object
console.log(Person.prototype.isPrototypeOf(adeyemi)); //the result is true , to check if an instance is a prototype of an Object
// onsole.log(Person.prototype.isPrototypeOf(Person)); //the result is false , because object cant be a prototype of an Object

Person.prototype.species = 'Homo Sapien'; //we can use this to add to an object properties;
console.log(adebayo.hasOwnProperty('species')); //the result is false, to check if an onject own a particular property directly,buh species is under the prototype

//Adding a method to the class
Person.prototype.calcAge = function () {
  console.log(2037 - this.dob);
};

//Accessing the method through the instance of the class
adebayo.calcAge();
console.log(adebayo.species);
