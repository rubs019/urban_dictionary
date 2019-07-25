import axios from "axios"
import { HeaderOpts, Methods } from './request.d'

export class Request {
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

    public async Post(endpoint?: string, headers?: HeaderOpts): Promise<any> {

    }

    public async Put(endpoint?: string, headers?: HeaderOpts): Promise<any> {

    }

    public async Patch(endpoint?: string, headers?: HeaderOpts): Promise<any> {

    }

    public async Delete(endpoint?: string, headers?: HeaderOpts): Promise<any> {

    }
}
