let neighbours = ['Japan', 'France', 'Italy'];
neighbours.push('Utopia');
console.log(neighbours);

neighbours.pop();
console.log(neighbours);

if (!neighbours.includes('Germany')) {
    console.log('Probably not a central european country :D');
}

const index = neighbours.indexOf('France');
neighbours[index] = 'Republic of France';
console.log(neighbours);


