import React, { useState } from 'react';
import { UserContext } from './UserContext';
import { User } from './User';

interface Props {}

export const UserContextProvider: React.FC<Props> = props => {
    const [user, setUser] = useState<User | null>(null);

    return <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>;
};
