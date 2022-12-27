import Component from "../Abstractions/Component.js";

/**
 * @class
 * @constructor
 * @extends Component
 */
class LoadingModal extends Component {
    message;
    /**
     * @param {string} message
     * @param {HTMLElement} container
     */
    constructor(message, container) {
        super("div", container);
        this.message = message;
    }

    /**
     * @param {string} message
     */
    setMessage(message) {
        this.message = message;
        this.BuildComponent();
    }

    BuildComponent() {
        this.element.className = "vh-100 vw-100 position-fixed top-0 left-0 d-flex flex-column justify-content-center align-items-center modal fade show";

        this.element.innerHTML = `
            <div class="spinner-border" role="status"></div>
            <span>${this.message}</span>
            <div class="modal-backdrop fade show"></div>
        `;
    }
}

export default LoadingModal;
