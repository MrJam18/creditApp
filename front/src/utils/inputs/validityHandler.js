export const validityHandler = (input, customValidity) => {
    if(input.validity.patternMismatch){
        input.setCustomValidity(customValidity);
    }
    else input.setCustomValidity('');
}