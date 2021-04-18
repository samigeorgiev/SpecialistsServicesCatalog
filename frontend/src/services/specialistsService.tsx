import { User } from '../contexts/User/User';
import { GetServiceRequestsResponse } from '../dtos/GetServiceRequestsResponse';
import { buildAuthorizationHeader, httpClient } from '../httpClient';
import { ServiceRequestStatus } from '../dtos/ServiceRequestStatus';
import { AxiosResponse } from 'axios';

const basePath = 'specialists';

export const specialistsService = {
    getServiceRequests: async (
        user: User,
        serviceStatus?: ServiceRequestStatus
    ): Promise<AxiosResponse<GetServiceRequestsResponse>> => {
        const path = `${basePath}/service-requests`;
        const params = new URLSearchParams();
        if (serviceStatus !== undefined) {
            params.append('serviceStatus', serviceStatus);
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
