class Component {
    container;
    element;

    constructor(elementType, container) {
        this.container = container || document.body;
        this.element = document.createElement(elementType);
    }

    BuildComponent(){};
    
    Render() {
        this.BuildComponent();
        this.container.appendChild(this.element);
    }

    ReRender(){
        this.container.innerHTML = "";
        this.Render();
    }

    Dispose(){
        this.element && this.element.remove();
    }
}

export default Component;
