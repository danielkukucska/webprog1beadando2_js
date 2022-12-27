import LoadingModal from "../../Utils/Loading.js";
import Pagination from "../Pagination/Pagination.js";
import UserRow from "./Components/UserRow.js";
import UserCard from "./Components/UserCard.js";
import UserServices from "../../Services/UserServices.js";
import User from "./Models/User.js";
import NewUserRow from "./Components/NewUserRow.js";

/**
 * @class
 * @constructor
 */
export class UsersPage {
    tbody;
    userServices;
    /**
     * @type {User[]}
     */
    users = [];
    loadingModal = new LoadingModal("Loading users...");
    usersPaginationContainer;
    /**
     * @type {Pagination | null}
     */
    usersPagination;
    usersPerPage = 3;
    selectedPage = 1;
    /**
     * @type {number}
     */
    totalPages;
    usersDetailsContainer;
    userCard;

    /**
     * @param {HTMLElement} container
     * @param {UserServices} userServices
     * @returns
     */
    constructor(container, userServices) {
        container.innerHTML = `
        <header>
            <h1>Users API</h1>
        </header>
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
        this.userCard = new UserCard(null, this.userServices, this.usersDetailsContainer);

        if (!this.tbody) {
            return console.error("Users table not found.");
        }

        //TODO handle changes of page size and page
        this.Init();
    }

    async Init() {
        await this.LoadUsers();
        this.RenderUsers();
    }

    RenderUsers() {
        if (this.usersPagination) {
            this.usersPagination.Dispose();
        }

        this.usersPagination = new Pagination(
            Array.from({ length: this.totalPages }, (_, i) => i + 1),
            this.selectedPage,
            this.OnChangePagination.bind(this),
            this.usersPaginationContainer,
            this.users.length,
            this.usersPerPage
        );
        this.usersPagination.Render();

        this.tbody.innerHTML = "";

        const startIndex = (this.selectedPage - 1) * this.usersPerPage;
        const usersToRender = this.users.slice(startIndex, startIndex + this.usersPerPage);
        usersToRender.forEach((user) => {
            const userRow = new UserRow(user, this.ShowUserCard, this.tbody);
            userRow.Render();
        });

        const newUserRow = new NewUserRow(this.SaveUser,this.tbody)
        newUserRow.Render();
    }

    /**
     * @param {number} selectedPage
     * @param {number} usersPerPage
     */
    OnChangePagination(selectedPage, usersPerPage) {
        this.selectedPage = selectedPage;
        if (usersPerPage) {
            this.usersPerPage = usersPerPage;
            this.totalPages = Math.ceil(this.users.length / usersPerPage);
        }

        this.RenderUsers();
    }

    LoadUsers = async () => {
        this.loadingModal.Render();

        this.users = await this.userServices.GetAll();
        this.totalPages = Math.ceil(this.users.length / this.usersPerPage);

        this.loadingModal.Dispose();
    };

    /**
     *
     * @param {number} id
     * @param {"view" | "update" | "delete"} mode
     */
    ShowUserCard = async (id, mode) => {
        const user = await this.userServices.GetById(id);
        this.userCard.Update(user, mode, this.SaveUser, this.DeleteUser);
        this.userCard.ReRender();
    };

    /**
     *
     * @param {"view" | "update" | "delete"}  mode
     * @param {User} user
     */
    SaveUser = async (mode, user) => {
        if (mode === "update") {
            const updatedUser = await this.userServices.Update(user);
            if (updatedUser) {
                this.users = this.users.map((u) => (u.id == updatedUser.id ? { ...u, ...updatedUser } : u));
            }
        } else {
            const createdUser = await this.userServices.Create(user);
            if (createdUser) {
                this.users.push(createdUser);
            }
        }

        this.RenderUsers();
    };

    /**
     * @param {number} id
     */
    DeleteUser = async (id) => {
        const result = await this.userServices.Delete(id);
        if (!result) return;

        this.users = this.users.filter((user) => user.id != id);
        this.totalPages = Math.ceil(this.users.length / this.usersPerPage);
        if (this.selectedPage > this.totalPages) {
            this.selectedPage--;
        }

        this.RenderUsers();
    };
}
