import HttpException from "../Exceptions/HttpException.js";
import Service from "../Abstractions/Service.js";
import { toast } from "../main.js";

class UserServices extends Service {
    constructor(baseUrl) {
        super(baseUrl);
    }
    async GetAll(page = 1){
        try {
            const resp = await fetch(this.baseUrl + `?page=${page}`);
            if (!resp.ok) throw new HttpException(resp.status, resp.statusText);
            const { data } = await resp.json();
            toast.Add("Users loaded.");
            return data;
        } catch (error) {
            switch (true) {
                case error.status >= 500:
                    toast.Add("Unexpected server error.");
                    break;
                default:
                    error.Add("Unexpected error.");
                    break;
            }
            return null;
        }
    }

    async GetById(id) {
        try {
            const resp = await fetch(this.baseUrl + "/" + id);
            if (!resp.ok) throw new HttpException(resp.status, resp.statusText);
            const { data } = await resp.json();
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

    async Delete(id) {
        try {
            const resp = await fetch(this.baseUrl + "/" + id, {
                method: "DELETE",
            });
            if (!resp.ok) throw new HttpException(resp.status, resp.statusText);
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
