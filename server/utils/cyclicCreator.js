module.exports = async function cyclicCreator(array, Model, next) {
    try {  
    for(let i = 0; i < array.length; i++) {
        await Model.create({...array[i]}); 
    }
}
    catch(e) {
        // return next(ApiError.badRequest(e));
        console.log(e);
        
    }
}