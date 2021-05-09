import { User } from '../contexts/User/User';
import { buildAuthorizationHeader, httpClient } from '../httpClient';
import { GetServiceRequestsResponse } from '../dtos/GetServiceRequestsResponse';
import { ServiceRequestStatus } from '../dtos/ServiceRequestStatus';

const basePath = 'users';

export const usersService = {
    getServiceRequests: async (user: User, serviceRequestStatus?: ServiceRequestStatus, paid?: boolean) => {
        const path = `${basePath}/service-requests`;
        const params = new URLSearchParams();
        if (serviceRequestStatus !== undefined) {
            params.append('serviceStatus', serviceRequestStatus);
        }
        if (paid !== undefined) {
            params.append('paid', String(paid));
        }
        try {
            return await httpClient.get<GetServiceRequestsResponse>(path, {
                params,
                headers: {
                    ...buildAuthorizationHeader(user)
                }
            });
        } catch (error) {
            throw error;
        }
    }
};