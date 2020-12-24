import { ErrorResponse } from './ErrorResponse';

export interface HttpState<TResponseBody> {
    loading: boolean;
    error: ErrorResponse | null;
    response: (TResponseBody & { status: number }) | null;
}
