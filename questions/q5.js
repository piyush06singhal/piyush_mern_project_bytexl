
/* code for printing the biggest number in the array */

const arr = [111,22,34,67,34,600,78];
let maximum = arr[0];

for(let i = 1; i < arr.length; i++) {
    if(arr[i] > maximum) {
        maximum = arr[i];
    }
}

console.log(maximum);

