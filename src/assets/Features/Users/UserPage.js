import UserServices from "../../Services/UserServices.js";
import LoadingModal from "../../Utils/Loading.js";
import Pagination from "../Pagination/Pagination.js";
import UserRow from "./Components/UserRow.js";
import UserDetails from "./Components/UserDetails.js";
export class UsersPage {
    tbody;
    userServices;
    users = [];
    loadingModal = new LoadingModal("Loading users...");
    usersPaginationContainer;
    usersPagination;
    usersPerPage = 10;
    usersDetailsContainer;
    userDetails;

    constructor(container, userServices) {
        container.innerHTML = `
        <header>
            <h1>Users API</h1>
        </header>
        <button id="toast">Test Toast</button>
        <main class="container">
            <div class="table-responsive" id="usersTable">
                <table class="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th id="avatar">Avatar</th>
                            <th id="fullName">Full Name</th>
                            <th id="email">Email</th>
                            <th id="actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider" id="usersTableBody"></tbody>
                </table>
            </div>
            <div id="usersPagination"></div>
            <div id="usersDetails"></div>
        </main>
        `;

        this.usersPaginationContainer = container.querySelector("#usersPagination");
        this.usersDetailsContainer = container.querySelector("#usersDetails");

        this.tbody = container.querySelector("#usersTableBody");
        this.userServices = userServices;
        this.userDetails = new UserDetails(null, this.userServices, this.usersDetailsContainer);
    }

    LoadUsers = async (page) => {
        if (!this.tbody) {
            return console.error("Users table not found.");
        }

        this.loadingModal.Render();

        const { users, total, totalPage } = await this.userServices.GetAll(page, this.usersPerPage);

        this.loadingModal.Dispose();

        if (!users) {
            this.loadingModal.Dispose();
            return;
        }

        if (this.usersPagination) {
            this.usersPagination.Dispose();
        }

        this.usersPagination = new Pagination(
            Array.from({ length: totalPage }, (_, i) => i + 1),
            page || 1,
            this.LoadUsers,
            this.usersPaginationContainer
        );
        this.usersPagination.Render();

        this.tbody.innerHTML = "";

        users.forEach((user) => {
            const userRow = new UserRow(user, this.ShowUserDetails, this.tbody);
            userRow.Render();
        });

        console.log(users);
    };

    ShowUserDetails = async (id, mode) => {
        const user = await this.userServices.GetById(id);
        this.userDetails.Update(user, mode);
        this.userDetails.ReRender();

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
