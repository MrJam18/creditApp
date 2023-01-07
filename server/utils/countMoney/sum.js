module.exports = function sum(...numbers) {
       return numbers.reduce((acc, number)=> {
           return acc+= number;
        }, 0);
}