// class Human {
// 	constructor(){
// 			this.gender = "female"
// 	}
// 	printGender(){
// 			console.log(this.gender)
// 	}
// }
// class newPerson extends Human {
// 	constructor(){
// 			super()
// 			this.name = "kate"
// 			// this.gender = "male"
// 	}
// 	printName (){
// 			console.log(this.name)
// 	}
// }

// const person = new  newPerson()
// person.printName();
// person.printGender();

// class fruits {
//     orange = "lime";
//     pineapple = "pineapple";

//     printFruits = () =>{
//         console.log(this.orange, this.pineapple)
//     }
// }

// class Banana extends fruits {
//     features = "sweet banana"
//     printBanana = () => {
//         console.log(this.features)
//     }
// }
// const banana = new Banana();
// banana.printBanana();
// banana.printFruits();a
const splitingdata = []
let = result = [];

function splitingAnArray(array) {
  if (array.length == 2 && array.reduce((a, b) => a === b)) {
    splitingdata.push(1);
    splitingdata.push(array.lastIndexOf(array[0]));
    return splitingdata
  } else {
    let totalNum = array.reduce((a, b) => a + b)
    let arrDivided = totalNum / 2;
    let firstArray = array.slice(0, arrDivided);
    let lastItemFromFirstArr = firstArray.indexOf(firstArray.slice(-1).pop());
    let secondArray = array.slice(lastItemFromFirstArr, arrDivided);
    result.push(firstArray.reduce((num1, num2) => num1 + num2))
    result.push(secondArray.reduce((num1, num2) => num1 + num2))
    if (result.reduce((a, b) => a === b)) {
      splitingdata.push(result[0]);
      splitingdata.push(result.length)
      return splitingdata
    } else {
      return -1
    }

  }
}

// mongodb://<dbuser>:<dbpassword>@ds311538.mlab.com:11538/mock-premier-league
//DB_CONNECT = mongodb://localhost:27017/mockPremierLeague

let arraydata = [1, 1, 1, 2, 1]
console.log(splitingAnArray(arraydata))