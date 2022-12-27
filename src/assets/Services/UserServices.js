import HttpException from "../Exceptions/HttpException.js";
import Service from "../Abstractions/Service.js";
import { toast } from "../main.js";
import User from "../Features/Users/Models/User.js";

/**
 * @class
 * @extends Service
 */
class UserServices extends Service {
    /**
     * @param {string} baseUrl
     */
    constructor(baseUrl) {
        super(baseUrl);
    }

    /**
     * @async
     * @param {number} page
     * @returns {{users: User[], total: number, totalPage: number}}
     */
    async getPage(page) {
        try {
            const resp = await fetch(this.baseUrl + `?page=${page}`);
            if (!resp.ok) throw new HttpException(resp.status, resp.statusText);
            const { data, total, total_pages } = await resp.json();
            return { users: data, total, totalPage: total_pages };
        } catch (error) {
            switch (true) {
                case error.status >= 500:
                    toast.Add("Unexpected server error.");
                    break;
                default:
                    toast.Add("Unexpected error.");
                    break;
            }
            return null;
        }
    }

    /**
     * @async
     * @returns {User[]}
     */
    async GetAll() {
        // if(usersPerPage == 0){
        //     toast.Add("Users per page is set to 0.")
        //     return {data: [],totalPages: 0}
        // }

        const users = [];
        let page = 1;
        do {
            const result = await this.getPage(page++);
            if (result && result.users && result.users.length > 0) {
                users.push(...result.users);
            } else {
                break;
            }
        } while (true);

        // const totalPages = Math.ceil(data.length / usersPerPage);

        return users;
    }

    /**
     * @async
     * @param {number} id
     * @returns {User}
     */
    async GetById(id) {
        try {
            const resp = await fetch(this.baseUrl + "/" + id);
            if (!resp.ok) throw new HttpException(resp.status, resp.statusText);
            const { data } = await resp.json();
            toast.Add(`User loaded with id: ${id}`);
            return data;
        } catch (error) {
            switch (true) {
                case error.status === 404:
                    toast.Add(`User not found with id: ${id}.`);
                    break;
                case error.status >= 500:
                    toast.Add("Unexpected server error.");
                    break;
                default:
                    toast.Add("Unexpected error.");
                    break;
            }
            return null;
        }
    }

    /**
     * @async
     * @param {User} item
     * @returns {user}
     */
    async Create(item) {
        try {
            const resp = await fetch(this.baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(item),
            });
            if (!resp.ok) throw new HttpException(resp.status, resp.statusText);
            const data = await resp.json();
            toast.Add(`User created with:<br /> ${Object.keys(data).map((key) => `${key}\t${data[key]}`).join("<br />")}`);
            return data;
        } catch (error) {
            switch (true) {
                case error.status === 422:
                    toast.Add("Validation error.");
                    break;
                case error.status >= 500:
                    toast.Add("Unexpected error.");
                    break;
                default:
                    toast.Add("Unexpected server error.");
                    break;
            }
            return null;
        }
    }

    /**
     * @async
     * @param {User} item
     * @returns {User}
     */
    async Update(item) {
        try {
            const resp = await fetch(this.baseUrl + "/" + item.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(item),
            });
            if (!resp.ok) throw new HttpException(resp.status, resp.statusText);
            toast.Add(`User updated with id: ${item.id}`);
            const data = await resp.json();
            return data;
        } catch (error) {
            switch (true) {
                case error.status === 422:
                    toast.Add("Validation error.");
                    break;
                case error.status >= 500:
                    toast.Add("Unexpected server error.");
                    break;
                default:
                    toast.Add("Unexpected error.");
                    break;
            }
            return null;
        }
    }

    /**
     * @async
     * @param {number} id
     * @returns {boolean | null}
     */
    async Delete(id) {
        try {
            const resp = await fetch(this.baseUrl + "/" + id, {
                method: "DELETE",
            });
            if (!resp.ok) throw new HttpException(resp.status, resp.statusText);
            toast.Add(`User deleted with id: ${id}`);
            return true;
        } catch (error) {
            switch (true) {
                case error.status === 404:
                    toast.Add(`User not found with id: ${id}.`);
                    break;
                case error.status >= 500:
                    toast.Add("Unexpected server error.");
                    break;
                default:
                    toast.Add("Unexpected error.");
                    break;
            }
            return null;
        }
    }
}

export default UserServices;
