const country = "India";
const continent = "Asia";
const language = "Hindi";
let population = 1400000000;

// now we are splitting the country
const halfPopulation = population / 2;
console.log('each half is having ${halfPopulation} population');

// now we are increasing the population by 1
population++;
console.log('updated population is ${population}');

// now we are comparing the population with finland
const finland = 6000000;
if(population > finland) {
    console.log('${country} has more population than finland')
}
else {
    console.log('${country} does not have more population than finland')
}

// now coapring with average population
const average = 33000000;
if(population < average) {
    console.log('${country} has less population than average country');
}
else {
    console.log('${country} does not have less population than average country');
}

// for description variable
const description = '${country} is in ${continent}, and its ${population} people speak ${language}';
console.log(description);

