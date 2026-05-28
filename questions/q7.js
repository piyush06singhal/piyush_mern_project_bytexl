
/* print all male people first name given a complex object */

const people = [
    {
    firstName: "John",
    lastName: "Doe",
    gender: "male",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    gender: "female",
  },
];

for (let i = 0; i < people.length; i++) {
  if (people[i].gender === "male") {
    console.log(people[i].firstName);
  }
}




