import Component from "../../Abstractions/Component.js";

class Pagination extends Component{
    pageNumbers;
    activePage;
    loadPage;

    constructor(pageNumbers, activePage, loadPage , container) {
        super("nav", container);
        this.pageNumbers = pageNumbers;
        this.activePage = activePage;
        this.loadPage = loadPage;
    }

    BuildComponent(){
        this.element.innerHTML = `
        <ul class="pagination">
        ${this.pageNumbers.map(number => 
            `<li class="page-item">
                <button 
                    id="page_${number}"
                    class="page-link ${number == this.activePage ? 'active' : ''}"
                >
                    ${number}
                </button>
            </li>
            `).join("")}
        </ul>
        `
        
        this.element.querySelectorAll(".page-link").forEach(btn => {
            btn.addEventListener("click", () => this.loadPage(btn.id.replace("page_","")))
        })
    }

}

export default Pagination