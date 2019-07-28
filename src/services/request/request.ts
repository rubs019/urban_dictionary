import axios from "axios"
import buildRequestConfig from "@/helpers/buildRequestConfig"

export class APIRequest {
    private API = axios.create({
        baseURL: process.env.VUE_APP_API_PROD,
        timeout: 10000
    })

    public async Get(endpoint?: string, headers?: HeaderOpts): Promise<any> {
        return await this.API({
            method: Methods.GET,
            url: `/${endpoint}`
        })
    }

    public async Post(endpoint?: string, body?: any, headers?: HeaderOpts): Promise<any> {
        if (!endpoint) return Promise.reject('No endpoint was find')
        return await this.API(buildRequestConfig(endpoint, Methods.POST, headers, body))
    }

    public async Put(endpoint?: string, headers?: HeaderOpts): Promise<any> {

    }

    public async Patch(endpoint?: string, headers?: HeaderOpts): Promise<any> {

    }

    public async Delete(endpoint?: string, headers?: HeaderOpts): Promise<any> {

    }
}

export interface HeaderOpts {
    token?: string
}

export enum Methods {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    PUT = 'PUT',
    DELETE = 'DELETE'
}
