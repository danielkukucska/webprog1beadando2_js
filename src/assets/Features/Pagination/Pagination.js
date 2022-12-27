import Component from "../../Abstractions/Component.js";

/**
 * @class
 * @constructor
 */
class Pagination extends Component {
    pageNumbers;
    selectedPage;
    changePagination;

    /**
     * @param {number[]} pageNumbers
     * @param {number} selectedPage
     * @param {(selectedPage: number, itemsPerPage: number) => void} changePagination
     * @param {HTMLElement} container
     * @param {number} itemCount
     * @param {number} itemsPerPage
     */
    constructor(pageNumbers, selectedPage, changePagination, container, itemCount, itemsPerPage) {
        super("nav", container);
        this.pageNumbers = pageNumbers;
        this.selectedPage = selectedPage <= pageNumbers.length ? selectedPage : 1;
        this.changePagination = changePagination;
        this.itemCount = itemCount;
        this.itemsPerPage = itemsPerPage;
    }

    BuildComponent() {
        this.element.innerHTML = `
        <input type="range" min="1" max="${this.itemCount}" id="itemsPerPage" value="${this.itemsPerPage}" oninput="this.nextElementSibling.value = this.value"/>
        <output>${this.itemsPerPage}</output>
        <ul class="pagination">
        ${this.pageNumbers
            .map(
                (number) =>
                    `<li class="page-item">
                <button 
                    id="page_${number}"
                    class="page-link ${number == this.selectedPage ? "active" : ""}"
                >
                    ${number}
                </button>
            </li>
            `
            )
            .join("")}
        </ul>
        `;

        this.element.querySelector("#itemsPerPage").addEventListener("change", (e) => {
            console.log(e);
             this.changePagination(1, Number(e.target.value))
        });
        this.element.querySelectorAll(".page-link").forEach((btn) => {
            btn.addEventListener("click", () => this.changePagination(btn.id.replace("page_", "")));
        });
    }
}

export default Pagination;
