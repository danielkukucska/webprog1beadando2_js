// import UserServices from '@App/Services/UserServices';
import Component from "../../../Abstractions/Component.js";


class UserDetails extends Component {
    user;
    mode;

    constructor(user, container) {
        super("tr", container);
        this.user = user;
    }

    BuildComponent() {
        if(!this.user) {
            this.element.innerHTML = "";
            return;
        };

        switch (this.mode) {
            case "view":
                this.element.id = `userDetails_${this.user.id}`;
                this.element.style.width = "18rem";
                this.element.className ="card";
                this.element.innerHTML = `
                    <img src="${this.user.avatar}" class="card-img-top" alt="Profile picture for ${this.user.first_name} ${this.user.last_name}">
                    <div class="card-body">
                        <h5 class="card-title">${this.user.first_name} ${this.user.last_name}</h5>
                        <p class="card-text">${this.user.email}</p>
                    </div>    
                `;
                break;
            case "update":

                break;
            case "delete":
                break;
            default:
                this.element.innerHTML = "";
                break;
        }

       
    }

    Update(user,mode){
        this.user = user;
        this.mode = mode;
    }
    

}

export default UserDetails;
