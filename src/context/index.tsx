import React, { ReactNode } from "react";
import { LoginProvider } from './LoginContext'

const AppProviders = ({ children }: { children: ReactNode }) => {
    return (
        <LoginProvider>{children}</LoginProvider>
    )
}

export default AppProviders