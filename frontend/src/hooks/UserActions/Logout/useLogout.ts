import { useCallback, useContext } from 'react';
import { UserContext } from '../../../contexts/User/UserContext';
import { Logout } from './Logout';

export const useLogout = (): Logout => {
    const { setUser } = useContext(UserContext);

    const doLogout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration_date');

        setUser(null);
    }, [setUser]);

    return { doLogout };
};
