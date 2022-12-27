// import UserServices from '@App/Services/UserServices';
import Component from "../../../Abstractions/Component.js";
import User from "../Models/User.js";
import UserServices from "../../../Services/UserServices.js";

/**
 * @class
 * @constructor
 * @extends Component
 */
class UserCard extends Component {
    user;
    mode;
    userServices;

    /**
     * @param {User} user
     * @param {UserServices} userServices
     * @param {HTMLElement} container
     */
    constructor(user, userServices, container) {
        super("div", container);
        this.user = user;
        this.userServices = userServices;
    }

    BuildComponent() {
        if (!this.user) {
            this.element.innerHTML = "";
            return;
        }

        switch (this.mode) {
            case "view":
                this.element.id = `userDetails_${this.user.id}`;
                this.element.style.width = "18rem";
                this.element.className = "card";
                this.element.innerHTML = `
                    <img src="${this.user.avatar}" class="card-img-top" alt="Profile picture for ${this.user.first_name} ${this.user.last_name}">
                    <div class="card-body">
                        <h5 class="card-title">${this.user.first_name} ${this.user.last_name}</h5>
                        <p class="card-text">${this.user.email}</p>
                    </div>    
                `;
                break;
            case "update":
                this.element.id = `userDetails_${this.user.id}`;
                this.element.style.width = "36rem";
                this.element.className = "card";
                this.element.innerHTML = `
                    <form class="card-body">
                        <label for="firstName">
                            First Name
                        </label>
                        <input type="text" value="${this.user.first_name}" id="firstName" name="firstName" class="card-title" placeholder="First name" />
                        <label for="lastName">
                            Last Name
                        </label>
                        <input type="text" value="${this.user.last_name}" id="lastName" name="lastName" class="card-title" placeholder="Last name" />
                        <label>
                            Email
                        </label>
                        <input type="email" value="${this.user.email}" id="email" name="email" class="card-title" placeholder="Last name" />
                        
                        <input type="submit" value="Update" />
                        <input type="reset" value="Reset"/>
                    </form>    
                `;
                const form = this.element.querySelector("form");
                form.addEventListener("submit", async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const updatedUser = await this.userServices.Update({ id: this.user.id, ...Object.fromEntries(formData) });
                    console.log(updatedUser);
                    this.Update(null, "");
                    this.Dispose();
                });
                break;
            case "delete":
                this.element.id = `userDetails_${this.user.id}`;
                this.element.style.width = "36rem";
                this.element.className = "card";
                this.element.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">Delete ${this.user.first_name} ${this.user.last_name}?</h5>
                        <button id="delete">Delete</button>
                        <button id="cancel">Cancel</button>
                    </div>    
                `;
                const deleteBtn = this.element.querySelector("#delete");
                const cancelBtn = this.element.querySelector("#cancel");
                deleteBtn.addEventListener("click", async (e) => {
                    const result = await this.userServices.Delete(this.user.id);
                    this.Update(null, "");
                    this.Dispose();
                });
                cancelBtn.addEventListener("click", async (e) => {
                    this.Update(null, "");
                    this.Dispose();
                });
                break;
            default:
                this.element.innerHTML = "";
                break;
        }
    }

    /**
     *
     * @param {*} user
     * @param {*} mode
     */
    Update(user, mode) {
        this.user = user;
        this.mode = mode;
    }
}

export default UserCard;
