import axios from "axios";
import buildRequestConfig from "@/helpers/buildRequestConfig";
export class APIRequest {
    constructor() {
        this.API = axios.create({
            baseURL: process.env.VUE_APP_API_PROD,
            timeout: 10000
        });
    }
    async Get(endpoint, headers) {
        return await this.API({
            method: Methods.GET,
            url: `/${endpoint}`
        });
    }
    async Post(endpoint, body, headers) {
        if (!endpoint)
            return Promise.reject('No endpoint was find');
        return await this.API(buildRequestConfig(endpoint, Methods.POST, headers, body));
    }
    async Put(endpoint, headers) {
    }
    async Patch(endpoint, headers) {
    }
    async Delete(endpoint, headers) {
    }
}
export var Methods;
(function (Methods) {
    Methods["GET"] = "GET";
    Methods["POST"] = "POST";
    Methods["PATCH"] = "PATCH";
    Methods["PUT"] = "PUT";
    Methods["DELETE"] = "DELETE";
})(Methods || (Methods = {}));
//# sourceMappingURL=request.js.map