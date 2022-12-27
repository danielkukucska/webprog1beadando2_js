import Component from "../../Abstractions/Component.js";

/**
 * @class
 * @constructor
 */
class Pagination extends Component {
    pageNumbers;
    activePage;
    changePage;

    /**
     * @param {number} pageNumbers
     * @param {number} activePage
     * @param {() => void} changePage
     * @param {HTMLElement} container
     */
    constructor(pageNumbers, activePage, changePage, container) {
        super("nav", container);
        this.pageNumbers = pageNumbers;
        this.activePage = activePage;
        this.changePage = changePage;
    }

    BuildComponent() {
        this.element.innerHTML = `
        <ul class="pagination">
        ${this.pageNumbers
            .map(
                (number) =>
                    `<li class="page-item">
                <button 
                    id="page_${number}"
                    class="page-link ${number == this.activePage ? "active" : ""}"
                >
                    ${number}
                </button>
            </li>
            `
            )
            .join("")}
        </ul>
        `;

        this.element.querySelectorAll(".page-link").forEach((btn) => {
            btn.addEventListener("click", () => this.changePage(btn.id.replace("page_", "")));
        });
    }
}

export default Pagination;
