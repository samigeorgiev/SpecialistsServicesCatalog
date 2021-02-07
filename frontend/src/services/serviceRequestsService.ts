import { buildAuthorizationHeader, httpClient } from '../httpClient';
import { User } from '../contexts/User/User';
import { MakeServiceRequestRequest } from '../dtos/MakeServiceRequestRequest';

const basePath = 'service-requests';

export const serviceRequestsService = {
    makeServiceRequest: async (user: User, request: MakeServiceRequestRequest) => {
        try {
            return await httpClient.post<void>(basePath, request, {
                headers: {
                    ...buildAuthorizationHeader(user)
                }
            });
        } catch (error) {
            throw error;
        }
    },
    acceptServiceRequest: async (user: User, serviceRequestId: number) => {
        const path = `${basePath}/${serviceRequestId}/accept`;
        try {
            return await httpClient.put<void>(
                path,
                null,
                {
                    headers: {
                        ...buildAuthorizationHeader(user)
                    }
                }
            );
        } catch (error) {
            throw error;
        }
    }
};
