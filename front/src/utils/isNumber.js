/**
 * определяет, является ли значение цифрами, включая дробные числа.
 * @param {string} value строка, как правило из input
 * @returns {boolean} true, если это не число, иначе false.
 */
export const isNumber = (value) => {
    if (/^\d+$/.test(value) || /^\d+\.\d+$/.test(value) || /^\d+,\d+$/.test(value)) return false;
    return true;
}