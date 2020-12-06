import { useCallback, useMemo, useState } from 'react';
import { ErrorResponse } from './ErrorResponse';
import { HttpState } from './HttpState';
import { HttpOptions } from './HttpOptions';

export const useHttp = <TResponseBody>(): {
    state: HttpState<TResponseBody>;
    sendRequest: (url: string, httpOptions: HttpOptions) => void;
} => {
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
                const response = await fetch(url, buildRequestInitOptions(httpOptions));
                const body = await response.json();
                setLoading(false);

                if (response.ok) {
                    setResponse(body);
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
        [defaultOptions]
    );

    return {
        state: { loading, error, response },
        sendRequest
    };
};

const buildRequestInitOptions = (httpOptions: HttpOptions): RequestInit => {
    return {
        method: httpOptions.method,
        headers: {
            'Content-Type': 'application/json',
            ...httpOptions.headers
        },
        body: JSON.stringify(httpOptions.body)
    };
};
