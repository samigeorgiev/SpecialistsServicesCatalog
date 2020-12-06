import { useHttp } from '../Http/useHttp';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthenticationContext } from '../../contexts/Authentication/AuthenticationContext';

export interface UseFacebookAuthentication {
    redirectToFacebookLogin: () => void;
    authentication: {
        authenticate: (code: string) => void;
        error?: string;
        finished: boolean;
    };
}

export const useFacebookAuthentication = (): UseFacebookAuthentication => {
    const { authenticate: contextAuthenticate } = useContext(AuthenticationContext);
    const [authenticationError, setAuthenticationError] = useState<string | undefined>();
    const [authenticationFinished, setAuthenticationFinished] = useState(false);
    const { state: authenticationState, sendRequest } = useHttp<AuthenticationResponse>();

    useEffect(() => {
        if (authenticationState.response) {
            contextAuthenticate({
                token: authenticationState.response.token,
                tokenExpiresIn: authenticationState.response.expiresIn
            });
            setAuthenticationFinished(true);
        }
    }, [authenticationState.response, contextAuthenticate]);

    useEffect(() => {
        if (authenticationState.error) {
            setAuthenticationError(authenticationState.error.message);
        }
    }, [authenticationState.error]);

    const redirectToFacebookLogin = (): void => {
        window.location.href = buildAccessTokenUrl();
    };

    const authenticate = useCallback(
        (code: string): void => {
            const request: AuthenticationRequest = { code, redirectUri: buildAuthenticationRedirectUri() };
            sendRequest(process.env.REACT_APP_FACEBOOK_AUTHENTICATE_URL!, {
                method: 'POST',
                body: request
            });
        },
        [sendRequest]
    );

    return {
        redirectToFacebookLogin,
        authentication: {
            authenticate,
            error: authenticationError,
            finished: authenticationFinished
        }
    };
};

interface AuthenticationRequest {
    code: string;
    redirectUri: string;
}

interface AuthenticationResponse {
    token: string;
    expiresIn: number;
}

const buildAccessTokenUrl = (): string => {
    const stateToken = Math.random().toString(36);
    localStorage.setItem(process.env.REACT_APP_FACEBOOK_STATE_TOKEN_LOCALSTORAGE_KEY!, stateToken);

    const params = new URLSearchParams();
    params.append('client_id', process.env.REACT_APP_FACEBOOK_CLIENT_ID!);
    params.append('redirect_uri', buildAuthenticationRedirectUri());
    params.append('state', stateToken);
    return process.env.REACT_APP_FACEBOOK_GET_ACCESS_TOKEN_URL + '?' + params.toString();
};

const buildAuthenticationRedirectUri = (): string => {
    return window.location.origin + process.env.REACT_APP_FACEBOOK_REDIRECT_URI;
};
