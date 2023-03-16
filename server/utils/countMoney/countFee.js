function countFeeClaim(sum){
    let fee;
    sum = +sum;
    if(sum <= 20000){
        fee = sum / 100 * 4;
        if(fee < 400) fee = 400; 
    }
    else if((sum > 20000) && (sum <= 100000)){
        fee = ((sum - 20000) / 100 * 3) + 800;
    }
    else if((sum > 100000) && (sum <= 200000)){
        fee = ((sum - 100000) / 100 * 2) + 3200;
    }
    else if((sum > 200000) & (sum <= 1000000)){
        fee = ((sum - 200000) / 100 * 1) + 5200;
    }
    else {
        fee = ((sum - 1000000) / 100 * 0.5) + 13200;
        if (fee > 60000) fee = 60000;
    }
    return fee.toFixed(2);

}
function countFeeOrder(sum){
    let fee;
    sum = +sum;
    if(sum <= 20000){
        fee = sum / 100 * 4;
        if(fee < 400) fee = 400; 
    }
    else if((sum > 20000) && (sum <= 100000)){
        fee = ((sum - 20000) / 100 * 3) + 800;
    }
    else if((sum > 100000) && (sum <= 200000)){
        fee = ((sum - 100000) / 100 * 2) + 3200;
    }
    else if((sum > 200000) & (sum <= 1000000)){
        fee = ((sum - 200000) / 100 * 1) + 5200;
    }
    else {
        fee = ((sum - 1000000) / 100 * 0.5) + 13200;
        if (fee > 60000) fee = 60000;
    }
    fee = fee / 2;
    return fee.toFixed(2);

}
module.exports = {countFeeClaim, countFeeOrder}