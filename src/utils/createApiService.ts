import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ApiResponse<T> {
    data: T;
    status: number;
    statusText: string;
}

export function createApiService(
    baseURL: string,
    authToken: string
): {
    get: <T>(url: string, config?: AxiosRequestConfig) => Promise<ApiResponse<T>>;
    post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
    put: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
    delete: <T>(url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
} {
    const axiosInstance = axios.create({
        baseURL,
        headers: {
            'x-api-key': authToken,
            'Content-Type': 'application/json',
        },
    });

    async function request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return axiosInstance.request<T>(config);
    }

    async function get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await request<T>({ ...config, method: 'GET', url });
            return response;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async function post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return request<T>({ ...config, method: 'POST', data, url });
    }

    async function put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return request<T>({ ...config, method: 'PUT', data, url });
    }

    async function deleteReq<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return request<T>({ ...config, method: 'DELETE', url });
    }

    return {
        get,
        post,
        put,
        delete: deleteReq, // Renamed because delete is a reserved keyword
    };
}
