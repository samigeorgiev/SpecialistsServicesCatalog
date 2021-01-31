import { buildAuthorizationHeader, httpClient } from '../httpClient';
import { User } from '../contexts/User/User';
import { MakeServiceRequestRequest } from '../dtos/MakeServiceRequestRequest';

const basePath = 'service-requests';

export const makeServiceRequest = async (user: User, request: MakeServiceRequestRequest) => {
    try {
        return await httpClient.post<void>(basePath, request, {
            headers: {
                ...buildAuthorizationHeader(user)
            }
        });
    } catch (error) {
        throw error;
    }
};
