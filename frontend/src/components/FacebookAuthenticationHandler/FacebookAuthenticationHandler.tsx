import React, {FunctionComponent, useEffect, useState} from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Loader, Message } from 'semantic-ui-react';
import { useFacebookAuthentication } from '../../hooks/Authentication/useFacebookAuthentication';

export interface Props {}

export const FacebookAuthenticationHandler: FunctionComponent<Props> = () => {
    const [error, setError] = useState<string | undefined>();
    const location = useLocation();
    const { authentication } = useFacebookAuthentication();

    const { authenticate } = authentication;
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const localState = localStorage.getItem(process.env.REACT_APP_FACEBOOK_STATE_TOKEN_LOCALSTORAGE_KEY!);
        localStorage.removeItem(process.env.REACT_APP_FACEBOOK_STATE_TOKEN_LOCALSTORAGE_KEY!);
        if (localState == null || localState !== params.get('state') || !params.has('code')) {
            setError('Authentication failed.');
            return;
        }

        authenticate(params.get('code')!);
    }, [location, authenticate]);

    if (authentication.finished) {
        return <Redirect to="/" />;
    }

    const errorMessage = error || authentication.error;
    if (errorMessage !== undefined) {
        return <Message header="Authentication error" content={errorMessage} negative />;
    }

    return <Loader />;
};
