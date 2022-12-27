import Component from "../Abstractions/Component.js";

/**
 * @class
 * @constructor
 * @extends Component
 */
class Toast extends Component {
    /**
     * @param {HTMLElement} container
     */
    constructor(container) {
        super("div", container);
    }

    /**
     * @param {string} message
     * @returns {string}
     */
    Add(message) {
        const id = "toast_" + Date.now().toString();
        const tc = this.container.querySelector("#toastContainer");
        tc.innerHTML += `
                <div class="toast show align-items-center border-0" role="alert" id="${id}">
                    <div class="d-flex">
                        <div class="toast-body">
                        ${message}
                        </div>
                        <button type="button" class="btn-close me-2 m-auto" aria-label="Close"></button>
                    </div>
                </div>
                `;

        //appending to innerhtml removes event listeners
        const toasts = this.container.querySelectorAll(`.toast`);
        [...toasts].forEach((toast) => toast.addEventListener("click", () => this.Remove(toast.id)));

        setTimeout(() => {
            this.Remove(id);
        }, 5000);

        return id;
    }

    /**
     * @param {number} id
     */
    Remove(id) {
        const el = this.container.querySelector(`#${id}`);
        el && el.remove();
    }

    BuildComponent() {
        this.element = document.createElement("div");
        this.element.id = "toastContainer";
        this.element.className = "position-fixed bottom-0 end-0 p-3 d-flex flex-column gap-3";
    }
}

export default Toast;
