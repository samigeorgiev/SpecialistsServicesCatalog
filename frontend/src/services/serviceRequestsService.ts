import { buildAuthorizationHeader, httpClient } from '../httpClient';
import { User } from '../contexts/User/User';
import { MakeServiceRequestRequest } from '../dtos/MakeServiceRequestRequest';
import { AxiosResponse } from 'axios';
import { GetServiceRequestResponse } from '../dtos/GetServiceRequestResponse';

const basePath = 'service-requests';

export const serviceRequestsService = {
    makeServiceRequest: async (user: User, request: MakeServiceRequestRequest): Promise<AxiosResponse<void>> => {
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
    acceptServiceRequest: async (user: User, serviceRequestId: number): Promise<AxiosResponse<void>> => {
        const path = `${basePath}/${serviceRequestId}/accept`;
        try {
            return await httpClient.put<void>(path, null, {
                headers: {
                    ...buildAuthorizationHeader(user)
                }
            });
        } catch (error) {
            throw error;
        }
    },
    finishServiceRequest: async (user: User, serviceRequestId: number): Promise<AxiosResponse<void>> => {
        const path = `${basePath}/${serviceRequestId}/finish`;
        try {
            return await httpClient.put<void>(path, null, {
                headers: {
                    ...buildAuthorizationHeader(user)
                }
            });
        } catch (error) {
            throw error;
        }
    },
    commentServiceRequest: async (
        user: User,
        serviceRequestId: number,
        comment: string
    ): Promise<AxiosResponse<void>> => {
        const path = `${basePath}/${serviceRequestId}/comment`;
        const request = { comment };
        try {
            return await httpClient.put<void>(path, request, {
                headers: {
                    ...buildAuthorizationHeader(user)
                }
            });
        } catch (error) {
            throw error;
        }
    },

    rateServiceRequest: async (user: User, serviceRequestId: number, rating: number): Promise<AxiosResponse<void>> => {
        const path = `${basePath}/${serviceRequestId}/rate`;
        const request = { rating };
        try {
            return await httpClient.put<void>(path, request, {
                headers: {
                    ...buildAuthorizationHeader(user)
                }
            });
        } catch (error) {
            throw error;
        }
    },
    getServiceRequest: async (serviceRequestId: number): Promise<AxiosResponse<GetServiceRequestResponse>> => {
        const path = `${basePath}/${serviceRequestId}`;
        try {
            return await httpClient.get<GetServiceRequestResponse>(path);
        } catch (error) {
            throw error;
        }
    }
};
