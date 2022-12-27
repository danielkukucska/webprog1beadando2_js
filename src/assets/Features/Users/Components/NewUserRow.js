// import UserServices from '@App/Services/UserServices';
import Component from "../../../Abstractions/Component.js";
import { toast } from "../../../main.js";
import User from "../Models/User.js";

/**
 * @class
 * @constructor
 * @extends Component
 */
class NewUserRow extends Component {
    /**
     * @type {(mode: "update", user: User) => Promise<void> | (mode: "create", user: {name: string, job: string}) => Promise<void>}
     */
    saveUser;

    /**
     * @param {(mode: "update" | "create" , user: User) => Promise<void>} saveUser
     * @param {HTMLElement} container
     */
    constructor(saveUser, container) {
        super("tr", container);
        this.saveUser = saveUser;
    }

    BuildComponent() {
        this.element.id = "new_user_row";

        this.element.innerHTML = `
        <td colspan="3">
            <form id="new_user_form">
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                />
                <input
                    type="text"
                    id="job"
                    name="job"
                    placeholder="Job"
                />
            </form>
        </td>
        <td>
            <button form="new_user_form" type="submmit" class="btn btn-primary">Create</button>
            <button form="new_user_form" type="reset" class="btn btn-danger">Reset</button>
        </td>
        `;

        const form = this.element.querySelector("form");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const newUser = { ...Object.fromEntries(formData) };

            const isValid = this.ValidateUser(newUser)
            if(!isValid) return;

            await this.saveUser("create", newUser);

            form.reset();
        });
    }

    /**
     * @param {{name: string, job: string}} user
     * @returns {boolean}
     */
    ValidateUser(user) {
        let result = true;
        const nameSchema = /^[A-Za-z]{1}[A-Za-z0-9]{4,}/;
        if (!nameSchema.test(user.name)) {
            result = false;
            toast.Add("Username should be at least 5 characters starting with a letter (lower and uppercase english letters and numbers).");
        }

        const jobSchema = /^[a-z]{1}[a-z ]{4,}/;
        if (!jobSchema.test(user.job)) {
            result = false;
            toast.Add("Job should be at least 5 characters starting with a letter (lowercase english letters and space).");
        }

        const keys = ["name", "job"]
        Object.keys(user).forEach((key) => {
            if (!keys.includes(key)) {
                result = false;
                toast.Add(`Invalid property when creating user: ${key}`);
            }
        });

        return result;
    }
}

export default NewUserRow;
