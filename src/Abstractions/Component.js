/**
 * @class
 * @constructor
 * @abstract
 */
class Component {
    container;
    element;

    /**
     * @param {keyof HTMLElementTagNameMap} elementType
     * @param {HTMLElement} container
     */
    constructor(elementType, container) {
        /**
         * @type { HTMLElement }
         * @private
         */
        this.container = container || document.body;
        /**
         * @type {HTMLElement}
         * @private
         */
        this.element = document.createElement(elementType);
    }

    BuildComponent() {}

    Render() {
        this.BuildComponent();
        this.container.appendChild(this.element);
    }

    ReRender() {
        this.container.innerHTML = "";
        this.Render();
    }

    Dispose() {
        this.element && this.element.remove();
    }
}

export default Component;
