
/* Code to greet the person on the basis of gender */

function greeting (name, gender) {
    if(gender == 'male') {
        console.log(" hello Mr." + name);
    }
    else {
        console.log(" hello Mrs." + name);
    }
}

greeting("Piyush", "male")
greeting("Piyushi", "female")



