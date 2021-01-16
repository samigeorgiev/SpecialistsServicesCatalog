import { useHttp } from '../../Http/useHttp';
import { HttpOptions } from '../../Http/HttpOptions';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../contexts/User/UserContext';
import { BecomeSpecialist } from './BecomeSpecialist';

export const useBecomeSpecialist = (): BecomeSpecialist => {
    const [finished, setFinished] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const { state, sendRequest } = useHttp<void>();

    useEffect(() => {
        if (state.response) {
            if (user === null) {
                throw new Error('User is not logged in');
            }
            setUser({ ...user, isSpecialist: true });
            setFinished(true);
        }
    }, [setUser, state.response, user]);

    const doBecomeSpecialist = (): void => {
        if (user === null) {
            throw new Error('User is not authenticated');
        }
        const httpOptions: HttpOptions = {
            method: 'POST',
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
