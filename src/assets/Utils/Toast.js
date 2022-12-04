import Component from "../Abstractions/Component.js";

class Toast extends Component {

    constructor(container) {
        super("div",container);
    }

    Add(message) {
        const id = "toast_" + Date.now().toString()
        const tc = this.container.querySelector("#toastContainer")
        tc.innerHTML += `
                <div class="toast show align-items-center border-0" role="alert" id="${id}">
                    <div class="d-flex">
                        <div class="toast-body">
                        ${message}
                        </div>
                        <button type="button" class="btn-close me-2 m-auto" aria-label="Close"></button>
                    </div>
                </div>
                `
        
        //appending to innerhtml removes event listeners
        const toasts = this.container.querySelectorAll(`.toast`);
        [...toasts].forEach(toast => toast.addEventListener("click", () => this.Remove(toast.id)))

        setTimeout(() => {
            this.Remove(id);
        }, 50000);

        return id;
    }

    Remove(id) {
        const el = this.container.querySelector(`#${id}`);
        el && el.remove();
    }

    BuildComponent() {
        this.element = document.createElement("div");
        this.element.id= "toastContainer";
        this.element.className = "position-fixed bottom-0 end-0 p-3 d-flex flex-column gap-3";
        // this.element.style.border = "1px solid red"
    }
}

export default Toast;
