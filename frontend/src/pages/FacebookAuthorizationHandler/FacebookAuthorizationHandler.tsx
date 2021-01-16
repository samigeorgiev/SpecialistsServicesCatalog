import React, { FunctionComponent, useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { useFacebookOAuth2 } from '../../hooks/OAuth2/useFacebookOAuth2';
import { facebookParametersKey } from '../../hooks/OAuth2/FacebookParametersKey';
import { ErrorMessage } from '../../components/Common/ErrorMessage';

export const FacebookAuthorizationHandler: FunctionComponent = () => {
    const [error, setError] = useState<string | undefined>();
    const location = useLocation();
    const { authorization } = useFacebookOAuth2();

    const { doAuthorization } = authorization;
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const localState = localStorage.getItem(process.env.REACT_APP_FACEBOOK_STATE_TOKEN_LOCALSTORAGE_KEY!);
        localStorage.removeItem(process.env.REACT_APP_FACEBOOK_STATE_TOKEN_LOCALSTORAGE_KEY!);
        if (
            localState == null ||
            localState !== params.get(facebookParametersKey.STATE) ||
            !params.has(facebookParametersKey.CODE)
        ) {
            setError('Authentication failed.');
            return;
        }

        doAuthorization(params.get(facebookParametersKey.CODE)!);
    }, [location, doAuthorization]);

    if (authorization.finished) {
        return <Redirect to="/" />;
    }

    const errorMessage = error || authorization.error;
    if (errorMessage !== undefined) {
        return <ErrorMessage header="Authentication error" content={errorMessage} />;
    }

    return <Loader />;
};
