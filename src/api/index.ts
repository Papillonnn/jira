import { http } from "./http";
import { LoginParamsProps } from 'context/LoginContext'

export const loginAction = (params: LoginParamsProps) => http('login', { params, method: 'POST' })
export const registerAction = (params: LoginParamsProps) => http('register', { params, method: 'POST' })
