// import UserServices from '@App/Services/UserServices';
import Component from "../../../Abstractions/Component.js";
import UserDetails from "./UserDetails.js";


class UserRow extends Component {
    user;
    showUserDetails;

    //TODO show update, delete popup
    constructor(user, showUserDetails, container) {
        super("tr", container);
        this.user = user;
        this.showUserDetails = showUserDetails
    }

    BuildComponent() {
        this.element.id = this.user.id.toString();

        this.element.innerHTML = `
        <td>
            <img src="${this.user.avatar}" alt="Profile picture for ${this.user.first_name} ${this.user.last_name}"/>
        </td>
        <td id="fullName_${this.user.id}">
            ${this.user.first_name} ${this.user.last_name}
        </td>
        <td>
            ${this.user.email}
        </td>
        <td>
            <button class="btn btn-primary" id="update_${this.user.id}">Update</button>
            <button class="btn btn-danger" id="delete_${this.user.id}">Delete</button>
        </td>
        `;

        const updateBtn = this.element.querySelector(`#update_${this.user.id}`) 
        updateBtn.addEventListener("click", () =>  this.showUserDetails(this.user.id, "update"))
        const deleteBtn = this.element.querySelector(`#delete_${this.user.id}`) 
        deleteBtn.addEventListener("click", () => this.userServices.Delete(this.user.id))
        const fullNameRow = this.element.querySelector(`#fullName_${this.user.id}`);
        fullNameRow.addEventListener("click", () => {
            this.showUserDetails(this.user.id, "view");
        })
    }

}

export default UserRow;
