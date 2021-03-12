import { Login } from './Login';
import { useCallback, useContext } from 'react';
import { UserContext } from '../../../contexts/User/UserContext';

export const useLogin = (): Login => {
    const { setUser } = useContext(UserContext);

    const doLogin = useCallback(
        (token: string, expiresIn: number): void => {
            fetch(process.env.REACT_APP_IS_SPECIALIST_URL!, {
                headers: {
                    'Content-Type': 'application-json',
                    Authorization: token
                }
            })
                .then(res => res.json())
                .then((data: IsSpecialistResponse) => {
                    setUser({
                        token,
                        tokenExpiresIn: expiresIn,
                        isSpecialist: data.specialist
                    });
                    localStorage.setItem('token', token);
                    localStorage.setItem('expiration_date', new Date(Date.now() + expiresIn).toString());
                });
        },
        [setUser]
    );

    return {
        doLogin
    };
};

interface IsSpecialistResponse {
    specialist: boolean;
}
