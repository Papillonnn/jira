import qs from "qs"
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { useLogin } from "context/LoginContext";
import { useCallback } from "react";

const baseUrl = process.env.REACT_APP_API_URL;

export interface ConfigProps extends AxiosRequestConfig {
    params?: object;
    token?: string;
}

export const http = async (url: string, { params, token, ...customConfig }: ConfigProps = {}): Promise<any> => {
    const config = {
        method: 'GET' as Method,
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": params ? "application/json" : "",
        },
        ...customConfig
    }
    if (config.method === 'GET') {
        url += `?${qs.stringify(params)}`
    } else {
        config.data = JSON.stringify(params || {})
    }
    return axios(`${baseUrl}${url}`, config).then(async (res: AxiosResponse) => {
        if (res.status === 200 || res.status === 201) {
            return res.data
        } else {
            return Promise.reject(res.data)
            // reject({message: '网络或服务器异常'})
            // return Promise.reject({msg: '网络或服务器异常'})
        }
    }).catch(error => {
        console.log(error)
        // return Promise.reject(error)
        return Promise.reject({message: '网络或服务器异常'})
    })
}

// 自动携带token
export const useHttp = () => {
    const { user } = useLogin()
    return useCallback(
        (...[url, config]: Parameters<typeof http>) => http(url, { ...config, token: user?.token }),
        [user?.token]
    )
}
