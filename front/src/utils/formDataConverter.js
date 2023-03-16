/**
 * 
 * @param {object} formRef - ссылка на форму.
 * @param {array} exceptions - массив c названиями исключений name формы.
 * @returns объект со свойствами, эквивалентными аттрибутам name инпутов формы и значениями value этих инпутов, за исключением параметра exceptions.
 */
export const formDataConverter = (formRef, exceptions = null)=> {
    const data = formRef.current ? formRef.current.elements : formRef;
    let object = {};
    const keys = Object.keys(data);
    if (exceptions) {
    keys.forEach(el => {
        if(/^\d+$/.test(el) || /^mui/.test(el)) return; 
        for (const value of exceptions) {
            if (value === el) return
        }
        if(data[el].value === 'on') object[el] = data[el].checked;
        else object[el] = data[el].value;
    });
}
    else {
        keys.forEach(el => {
            if(/^\d+$/.test(el) || /^mui/.test(el)) return;
            if(data[el].value === 'on') object[el] = data[el].checked;
            else object[el] = data[el].value;
    })
    }
    return object;
}