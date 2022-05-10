module.exports = function(nameHolder) {
    let surnameAndInitials = `${nameHolder.surname} ${nameHolder.name[0]}.`
    if(nameHolder.patronymic) surnameAndInitials += ` ${nameHolder.patronymic[0]}.`
    return surnameAndInitials;
} 