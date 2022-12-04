import UserServices from "../../Services/UserServices.js";
import LoadingModal from "../../Utils/Loading.js";
import UserRow from "./Components/UserRow.js";



export class UsersPage {
    tbody;
    userServices;
    users = [];
    loadingModal = new LoadingModal("Loading users...");

    constructor(tbody, userServices) {
        this.tbody = tbody;
        this.userServices = userServices;
    }

    LoadUsers = async (page) => {
        if (!this.tbody) {
            return console.error("Users table not found.");
        }

        this.loadingModal.Render();

        const newUsers = await this.userServices.GetAll(page);

        this.loadingModal.Dispose();

        if (!newUsers) return;

        newUsers.forEach((user) => {
            const userRow = new UserRow(user,this.userServices,this.tbody);
            userRow.Render();
        });

        console.log(newUsers);
    };

    ToggleUserModal = () => {
        const editModal = document.getElementById("userModal");

        if (editModal) {
            console.log("Finish edit");
            editModal.remove();
        } else {
            //TODO add modal
            console.log("Edit user");
        }
    };

    SaveUser = async (mode) => {
        if (mode === "Update") {
            const updatedUser = await this.userServices.Update({});
            if (updatedUser) {
                console.log({ updatedUser });
            } else {
                console.log("fail");
            }
        } else {
            const createdUser = await this.userServices.Create({});
            if (createdUser) {
                console.log({ createdUser });
            } else {
                console.log("fail");
            }
        }
    };

    DeleteUser = async (id) => {
        const result = await this.userServices.Delete(id);
        if (!result) return;

        console.log({ result });
    };
}
