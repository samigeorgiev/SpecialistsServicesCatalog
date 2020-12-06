import React, { Context } from 'react';
import { User } from "./User";

export interface AuthenticationContextProps {
    user: User | null;
    authenticate: (user: User) => void;
}

export const AuthenticationContext: Context<AuthenticationContextProps> = React.createContext<AuthenticationContextProps>(
    {
        user: null,
        authenticate: () => {}
    }
);
