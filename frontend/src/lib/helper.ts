import { myFetch } from "./api";

interface BackendResponse {
    data: any,
    status: number
}

interface GetFetchOptions {
    withCredentials?: boolean,
    headers?: HeadersInit,
    tags?: string[],
    body?:any
}

interface PostFetchOptions {
    body?: any,
    withCredentials?: boolean,
    headers?: HeadersInit,
    tags?: string[],
}

export class Backend {

    static async get(endpoint: string, options?: GetFetchOptions): Promise<BackendResponse> {
        const response = await myFetch(endpoint, {
            method: "GET",
            ...options,
            headers: {
                ...options?.headers,
                'Content-Type': 'application/json'
            }
        })
        let data;
        try {
            data = await response.json()
        } catch(e) {
            data = null;
        }
        return { data, status: response.status }
    }

    static async post(endpoint: string, options: PostFetchOptions): Promise<BackendResponse> {
        const response = await myFetch(endpoint, {
            method: "POST",
            ...options,
            body: JSON.stringify(options.body),
            headers: {
                ...options.headers,
                'Content-Type': 'application/json'
            }
        })
        let data;
        try {
            data = await response.json()
        } catch(e) {
            data = null;
        }
        return { data, status: response.status }
    }


    static async delete(endpoint: string, options?: GetFetchOptions): Promise<BackendResponse> {
        const response = await myFetch(endpoint, {
            method: "DELETE",
            ...options,
            headers: {
                ...options?.headers,
                'Content-Type': 'application/json'
            }
        })
        let data;
        try {
            data = await response.json()
        } catch(e) {
            data = null;
        }
        return { data, status: response.status }
    }
}