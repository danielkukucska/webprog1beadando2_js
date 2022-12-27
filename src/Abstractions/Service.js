/**
 * @class
 * @abstract
 */
class Service {
    baseUrl;
    /**
     * @param {string} baseUrl
     */
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    /**
     * @param {number} page
     */
    GetAll(page) {}
    /**
     * @param {number} id
     */
    GetById(id) {}
    /**
     * @param {object} item
     */
    Create(item) {}
    /**
     * @param {object} item
     */
    Update(item) {}
    /**
     * @param {number} id
     */
    Delete(id) {}
}

export default Service;
