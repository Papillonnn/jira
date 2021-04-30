import React, { ReactNode } from 'react';
import { UserProps } from 'screens/ProjectList';
import { loginAction, registerAction } from 'api';
import { http } from 'api/http';
import { useMount } from 'utils';
import { useAsync } from 'hooks/useAsync';
import { FullPageErrorFallback, FullPageLoading } from 'components/lib';

interface LoginContextProps {
    user: UserProps | null;
    login: (params: LoginParamsProps) => Promise<void>,
    register: (params: LoginParamsProps) => Promise<void>,
    logout: () => void;
}

export interface LoginParamsProps {
    username: string;
    password: string;
}

const bootstrapUser = async () => {
    let user = null
    const token = window.localStorage.getItem('token')
    if (token) {
        user = http('me', {token})
    }
    return user
}

const LoginContext = React.createContext<LoginContextProps | null>(null)
LoginContext.displayName = 'LoginContext'

export const LoginProvider = ({ children }: { children: ReactNode }) => {
    const {data: user, setData: setUser, isIdle, isLoading, isError, error, run} = useAsync<UserProps | null>()
    const login = async (params: LoginParamsProps) => {
        const result = await loginAction(params) as UserProps | null
        window.localStorage.setItem('token', result?.token || '')
        setUser(result)
    }
    const register = async (params: LoginParamsProps) => {
        const result = await registerAction(params) as UserProps | null
        window.localStorage.setItem('token', result?.token || '')
        setUser(result)
    }
    const logout = () => {
        window.localStorage.removeItem('token')
        setUser(null)
    }

    useMount(() => {
        run(bootstrapUser())
    })

    if (isIdle || isLoading) {
        return <FullPageLoading />
    }

    if (isError) {
        return <FullPageErrorFallback error={error}/>
    }

    return <LoginContext.Provider
        children={children}
        value={{ user, login, register, logout }}
    />
}

export const useLogin = () => {
    const context = React.useContext(LoginContext)
    if (!context) {
        throw new Error('useLogin must be used in LoginProvider')
    }
    return context
}
