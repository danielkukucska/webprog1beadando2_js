/**
 * @class
 * @constructor
 */
class User {
    id;
    first_name;
    last_name;
    email;
    avatar;

    /**
     *
     * @param {number} id
     * @param {string} first_name
     * @param {string} last_name
     * @param {string} email
     * @param {string} avatar
     */
    constructor(id, first_name, last_name, email, avatar) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.avatar = avatar;
    }
}

export default User;
