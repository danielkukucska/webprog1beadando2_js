import { UsersPage } from "./Features/Users/UserPage.js";
import UserServices from "./Services/UserServices.js";
import Toast from "./Utils/Toast.js";

export const toast = new Toast();

toast.Render();

const container = document.querySelector("#usersTableBody");
if (container) {
    const usersPage = new UsersPage(container, new UserServices("https://reqres.in/api/users"));
    usersPage.LoadUsers();
}

