import { UsersPage } from "./Features/Users/UserPage.js";
import UserServices from "./Services/UserServices.js";
import Toast from "./Utils/Toast.js";

export const toast = new Toast();

toast.Render();

document.body.innerHTML += `<div id="usersPage"></div>`

const container = document.querySelector("#usersPage");
if (container) {
    const usersPage = new UsersPage(container, new UserServices("https://reqres.in/api/users"));
    usersPage.LoadUsers();
}

