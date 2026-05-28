
function percentageOfWorld1(population) {
    return (population / 7900) * 100;
}

const china1 = percentageOfWorld1(1441);
const portugal1 = percentageOfWorld1(10);
const usa1 = percentageOfWorld1(332);

console.log(china1);
console.log(portugal1);
console.log(usa1);

const percentageOfWorld2 = function(population) {
    return (population / 7900) * 100;
};

const china2 = percentageOfWorld2(1441);
const portugal2 = percentageOfWorld2(10);
const usa2 = percentageOfWorld2(332);

console.log(china2);
console.log(portugal2);
console.log(usa2);