const {moneyToDBFormat} = require("../utils/dataBase/moneyToDBFormat");

class NumbersHelper
{
    sum(...numbers) {
        return numbers.reduce((acc, number)=> {
            return acc+= +number;
        }, 0);
    }
    getDBFormat(number)
    {
        return moneyToDBFormat(number);
    }
    
}

module.exports.numbersHelper = new NumbersHelper();