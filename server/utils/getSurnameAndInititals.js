module.exports = function(nameHolder) {
    let surnameAndInitials = `${nameHolder.surname} ${nameHolder.name[0].toUpperCase()}.`
    if(nameHolder.patronymic) surnameAndInitials += ` ${nameHolder.patronymic[0].toUpperCase()}.`
    return surnameAndInitials;
} 