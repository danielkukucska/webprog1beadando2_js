/**
 * @class
 * @constructor
 */
class HttpException extends Error {
    status;
    message;
    /**
     * @param {number} status
     * @param {string} message
     */
    constructor(status, message) {
        super(message);
        /**
         * @type {number}
         */
        this.status = status;
        /**
         * @type {string}
         */
        this.message = message;
    }
}

export default HttpException;
