import { useCallback, useContext, useMemo, useState } from 'react';
import { ErrorResponse } from './ErrorResponse';
import { HttpState } from './HttpState';
import { HttpOptions } from './HttpOptions';
import { UserContext } from '../../contexts/User/UserContext';
import { User } from '../../contexts/User/User';

const HTTP_STATUS_NO_CONTENT = 204;

export const useHttp = <TResponseBody>(): {
    state: HttpState<TResponseBody>;
    sendRequest: (url: string, httpOptions?: HttpOptions) => void;
} => {
    const { user } = useContext(UserContext);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorResponse | null>(null);
    const [response, setResponse] = useState<(TResponseBody & { status: number }) | null>(null);

    const defaultOptions = useMemo<HttpOptions>(() => ({ method: 'GET' }), []);
    const sendRequest = useCallback(
        async (url: string, httpOptions: HttpOptions = defaultOptions): Promise<void> => {
            setLoading(true);
            setError(null);
            setResponse(null);

            try {
                const response = await fetch(url, buildRequestInitOptions(user, httpOptions));
                const body = response.status !== HTTP_STATUS_NO_CONTENT ? await response.json() : {};
                setLoading(false);

                if (isResponseSuccessful(response)) {
                    setResponse({
                        ...body,
                        status: response.status
                    });
                    return;
                }

                setError({
                    statusCode: response.status,
                    message: body.message
                });
            } catch (error) {
                setLoading(false);
                setError({ message: error.message });
            }
        },
        [defaultOptions, user]
    );

    return {
        state: { loading, error, response },
        sendRequest
    };
};

const buildRequestInitOptions = (user: User | null, httpOptions: HttpOptions): RequestInit => {
    const headers: Record<string, string> = { ...httpOptions.headers };
    headers['Content-Type'] = 'application/json';
    if (user !== null) {
        headers['Authorization'] = user.token;
    }
    return {
        method: httpOptions.method,
        headers,
        body: JSON.stringify(httpOptions.body)
    };
};

const isResponseSuccessful = (response: Response) => {
    return response.ok || response.status === HTTP_STATUS_NO_CONTENT;
};
