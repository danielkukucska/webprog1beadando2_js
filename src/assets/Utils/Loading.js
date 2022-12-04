import Component from "../Abstractions/Component.js";

//TODO: extends Component
class LoadingModal extends Component {
    message;

    constructor(message, container) {
        super("div",container);
        this.message = message;
    }

    setMessage(message) {
        this.message = message;
        this.BuildComponent();
    }

    BuildComponent() {
        this.element.className = "vh-100 vw-100 position-fixed top-0 left-0 d-flex flex-column justify-content-center align-items-center modal fade show"
        // this.container.style.display = "flex";
        // this.container.style.alignItems = "center";
        // this.container.style.justifyContent = "center";
        // this.container.style.position = "fixed";
        // this.container.style.top = "0";
        // this.container.style.left = "0";
        // this.container.style.height = "100vh";
        // this.container.style.width = "100vw";

        this.element.innerHTML = `
            <div class="spinner-border" role="status"></div>
            <span>${this.message}</span>
            <div class="modal-backdrop fade show"></div>
        `;

    }
}

export default LoadingModal;
