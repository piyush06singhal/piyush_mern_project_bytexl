// function
function percentageOfWorld1(populations) {
    return (populations / 7900) * 100;
}

const populations = [1441, 1380, 331, 273];
console.log(populations.length === 4); // for calcuating whether the array has 4 elements or not

const percentages = [percentageOfWorld1(populations[0]), 
percentageOfWorld1(populations[1]), 
percentageOfWorld1(populations[2]),
percentageOfWorld1(populations[3])];

console.log(percentages);

