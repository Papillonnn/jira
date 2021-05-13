import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { LoginProvider } from './LoginContext'

const AppProviders = ({ children }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <LoginProvider>{children}</LoginProvider>
        </QueryClientProvider>
    )
}

export default AppProviders