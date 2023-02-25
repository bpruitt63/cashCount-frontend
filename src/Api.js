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
        const res = await this.request(`/companies/${companyCode}`);
        return res.company;
    };
};

Api.token = localStorage.getItem("token");

export default Api;