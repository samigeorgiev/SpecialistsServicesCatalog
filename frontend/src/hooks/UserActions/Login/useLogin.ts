import { Login } from './Login';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/User/UserContext';

export const useLogin = (): Login => {
    const { setUser } = useContext(UserContext);

    const doLogin = (token: string, expiresIn: number): void => {
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
            });
    };

    return {
        doLogin
    };
};

interface IsSpecialistResponse {
    specialist: boolean;
}
