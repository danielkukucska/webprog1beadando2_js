import Component from "../Abstractions/Component.js";

class Toast extends Component {

    constructor(container) {
        super("div",container);
    }

    Add(message) {
        const id = "toast_" + Date.now().toString()
        console.log(this.element.id);
        this.element.innerHTML += `
                <div class="toast show align-items-center border-0" role="alert" id="${id}">
                    <div class="d-flex">
                        <div class="toast-body">
                        ${message}
                        </div>
                        <button type="button" class="btn-close me-2 m-auto" aria-label="Close"></button>
                    </div>
                </div>
                `
        const el = this.element.querySelector(`#${id}`);
        el && el.addEventListener("click",()=> this.Remove(id));
        setTimeout(() => {
            this.Remove(id);
        }, 5000);

        return id;
    }

    Remove(id) {
        const el = this.element.querySelector(`#${id}`);
        el && el.remove();
    }

    BuildComponent() {
        this.element = document.createElement("div");
        this.element.id= "toastContainer";
        this.element.className = "position-fixed bottom-0 end-0 p-3";
    }
}

export default Toast;
