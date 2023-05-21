'use dtrict';
class PersonCl {
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

class Student extends PersonCl {
  constructor(firstName, lastname, fullName, dob, courses) {
    super(firstName, lastname, fullName, dob);
    this.courses = courses;
  }

  introduce() {
    console.log(`my name is ${this.firstName},i studied ${this.courses}`);
  }

  //overriding the calcAge Method in the parent class(if not overdidden the parrent one will be use instead)
  calcAge() {
    console.log(
      `i am a student in university,but i am felling ilke ${
        2023 - this.dob + 10
      } years old`
    );
  }
}

const adebayo = new Student(
  'adebayo',
  'abdullah',
  'adebayo Abdullah',
  1999,
  'Computer Science'
);

//instance of a class accessing its class methods
adebayo.introduce();
//instance of child class accessing the methods from parent class
adebayo.calcAge();
