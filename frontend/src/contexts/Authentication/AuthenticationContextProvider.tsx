import React, { useCallback, useState } from 'react';
import { AuthenticationContext } from './AuthenticationContext';
import { User } from './User';

interface Props {}

const HTTP_DELAY_IN_SECONDS = 60;

export const AuthenticationContextProvider: React.FC<Props> = props => {
    const [user, setUser] = useState<User | null>(null);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expires_in');
    }, []);

    const authenticate = useCallback(
        (user: User) => {
            setUser(user);
            localStorage.setItem('token', user.token);
            const expirationDate = new Date();
            const expiresIn = user.tokenExpiresIn - HTTP_DELAY_IN_SECONDS;
            expirationDate.setSeconds(expirationDate.getSeconds() + expiresIn);
            localStorage.setItem('expires_in', expirationDate.toString());
            setTimeout(logout, expiresIn);
        },
        [logout]
    );

    return (
        <AuthenticationContext.Provider value={{ user, authenticate }}>{props.children}</AuthenticationContext.Provider>
    );
};
