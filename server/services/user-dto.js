
module.exports = class UserDTO {
    constructor(model) {
        this.id = model.id;
        this.email = model.email;
        this.groupId = model.groupId
    }
}