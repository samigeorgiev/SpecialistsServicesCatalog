import React, {FunctionComponent, useEffect, useState} from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Loader, Message } from 'semantic-ui-react';
import { useFacebookOAuth2 } from '../../hooks/OAuth2/useFacebookOAuth2';

export interface Props {}

export const FacebookAuthorizationHandler: FunctionComponent<Props> = () => {
    const [error, setError] = useState<string | undefined>();
    const location = useLocation();
    const { authorization } = useFacebookOAuth2();

    const { doAuthorization } = authorization;
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const localState = localStorage.getItem(process.env.REACT_APP_FACEBOOK_STATE_TOKEN_LOCALSTORAGE_KEY!);
        localStorage.removeItem(process.env.REACT_APP_FACEBOOK_STATE_TOKEN_LOCALSTORAGE_KEY!);
        if (localState == null || localState !== params.get('state') || !params.has('code')) {
            setError('Authentication failed.');
            return;
        }

        doAuthorization(params.get('code')!);
    }, [location, doAuthorization]);

    if (authorization.finished) {
        return <Redirect to="/" />;
    }

    const errorMessage = error || authorization.error;
    if (errorMessage !== undefined) {
        return <Message header="Authentication error" content={errorMessage} negative />;
    }

    return <Loader />;
};
