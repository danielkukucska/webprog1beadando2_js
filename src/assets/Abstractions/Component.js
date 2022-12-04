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
        this.element && this.container.appendChild(this.element);
    }

    Dispose(){
        this.element && this.element.remove();
    }
}

export default Component;
