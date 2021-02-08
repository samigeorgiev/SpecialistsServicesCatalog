import { useHttp } from '../../Http/useHttp';
import { HttpOptions } from '../../Http/HttpOptions';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../contexts/User/UserContext';
import { BecomeSpecialist } from './BecomeSpecialist';

export const useBecomeSpecialist = (): BecomeSpecialist => {
    const [finished, setFinished] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const { state, sendRequest } = useHttp<BecomeSpecialistResponse>();

    const { response } =state;
    useEffect(() => {
        if (response) {
            if (user === null) {
                throw new Error('User is not logged in');
            }
            setUser({ ...user, isSpecialist: true });
            setFinished(true);
            window.location.href = response.stripeAccountLink;
        }
    }, [setUser, response, user]);

    const doBecomeSpecialist = (): void => {
        if (user === null) {
            throw new Error('User is not authenticated');
        }
        const httpOptions: HttpOptions = {
            method: 'POST',
            body: {
                returnUrl: 'http://localhost:3000',
                refreshUrl: 'http://localhost:3000'
            },
            headers: {
                Authorization: user.token
            }
        };
        sendRequest(process.env.REACT_APP_BECOME_SPECIALIST_URL!, httpOptions);
    };

    return {
        doBecomeSpecialist,
        finished,
        error: state.error?.message || undefined
    };
};

interface BecomeSpecialistResponse {
    stripeAccountLink: string;
}