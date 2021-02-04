import { useHttp } from '../Http/useHttp';
import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/User/UserContext';
import { FacebookOAuth2 } from './FacebookOAuth2';
import { facebookParametersKey } from './FacebookParametersKey';
import { useLogin } from '../UserActions/Login/useLogin';

export const useFacebookOAuth2 = (): FacebookOAuth2 => {
    const { setUser } = useContext(UserContext);
    const [authorizationError, setAuthorizationError] = useState<string | undefined>();
    const [authorizationFinished, setAuthorizationFinished] = useState(false);
    const { state: authorizationState, sendRequest } = useHttp<AuthorizationResponse>();
    const login = useLogin();

    const authorizationResponse = authorizationState.response;
    useEffect(() => {
        if (authorizationResponse) {
            login.doLogin(authorizationResponse.token, authorizationResponse.expiresIn);
            setAuthorizationFinished(true);
        }
    }, [authorizationResponse, login, setUser]);

    useEffect(() => {
        if (authorizationState.error) {
            setAuthorizationError(authorizationState.error.message);
        }
    }, [authorizationState.error]);

    const redirectToFacebookLogin = (): void => {
        window.location.href = buildAccessTokenUrl();
    };

    const doAuthorization = useCallback(
        (code: string): void => {
            const request: AuthorizationRequest = { code, redirectUri: buildAuthenticationRedirectUri() };
            sendRequest(process.env.REACT_APP_FACEBOOK_AUTHENTICATE_URL!, {
                method: 'POST',
                body: request
            });
        },
        [sendRequest]
    );

    return {
        redirectToFacebookLogin,
        authorization: {
            doAuthorization,
            error: authorizationError,
            finished: authorizationFinished
        }
    };
};

interface AuthorizationRequest {
    code: string;
    redirectUri: string;
}

interface AuthorizationResponse {
    token: string;
    expiresIn: number;
}

const buildAccessTokenUrl = (): string => {
    const stateToken = Math.random().toString(36);
    localStorage.setItem(process.env.REACT_APP_FACEBOOK_STATE_TOKEN_LOCALSTORAGE_KEY!, stateToken);

    const params = new URLSearchParams();
    params.append(facebookParametersKey.CLIENT_ID, process.env.REACT_APP_FACEBOOK_CLIENT_ID!);
    params.append(facebookParametersKey.REDIRECT_URI, buildAuthenticationRedirectUri());
    params.append(facebookParametersKey.STATE, stateToken);
    return process.env.REACT_APP_FACEBOOK_GET_ACCESS_TOKEN_URL + '?' + params.toString();
};

const buildAuthenticationRedirectUri = (): string => {
    return window.location.origin + process.env.REACT_APP_FACEBOOK_REDIRECT_URI;
};
