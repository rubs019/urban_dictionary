import { AxiosRequestConfig } from "axios"
import { Methods } from '@/services/request/request'

export default function RequestConfig(endpoint: string, method: Methods, headers: any, body: any): AxiosRequestConfig {

    return {
        url: `/${endpoint}`,
        method: method,
        headers: buildHeaders(),
        data: body
    }
}

const buildHeaders = () => {
    return {
        Authorization: `Bearer`
    }
}
