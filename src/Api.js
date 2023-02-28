import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class Api {

    static token;

    /** Updates token when updating user info */
    static setToken(newToken) {
        this.token = newToken;
    };

    /** Sends request to database and catches any errors */
    static async request(endpoint, data={}, method="get") {
        const url = `${BASE_URL}/${endpoint}`;
        const headers = {Authorization: `Bearer ${Api.token}`};
        const params = (method === "get") ? data : {};

        try {
            return (await axios({url, method, data, params, headers})).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message;
            !err.response ? message = "Server error, please try again later"
                : message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        };
    };

    static async getCompany(companyCode) {
        const res = await this.request(`companies/${companyCode}`);
        return res.company;
    };

    static async login(data) {
        const res = await this.request('users/login', data, 'post');
        return res.token;
    };

    static async addCompany(data) {
        const res = await this.request('companies/new', data, 'post');
        return res.company;
    };

    static async addUser(data, companyCode) {
        const res = await this.request(`users/create/${companyCode}`, data, 'post');
        return res.user;
    };

    static async postCount(data, containerId) {
        const res = await this.request(`containers/${containerId}/count`, data, 'post');
        return res.count;
    };

    static async getCounts(data, containerId) {
        const res = await this.request(`containers/${containerId}/counts`, data, 'get');
        return res.counts;
    };
};

Api.token = localStorage.getItem("token");

export default Api;