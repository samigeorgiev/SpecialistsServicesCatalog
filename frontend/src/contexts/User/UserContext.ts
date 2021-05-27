import React, { Context } from 'react';
import { User } from './User';

export interface UserContextProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const UserContext: Context<UserContextProps> = React.createContext<UserContextProps>({
    user: null,
    setUser: () => {}
});
