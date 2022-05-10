module.exports = function(nameHolder) {
    const fullName = `${nameHolder.surname} ${nameHolder.name} ${nameHolder.patronymic}`
    delete nameHolder.surname;
    delete nameHolder.patronymic;
    nameHolder.name = fullName;
    return nameHolder;
}