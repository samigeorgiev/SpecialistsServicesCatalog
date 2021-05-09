import { GetOfferedServicesResponse } from '../dtos/GetOfferedServicesResponse';
import { httpClient } from '../httpClient';
import { AxiosResponse } from 'axios';

const basePath = '/services';

export const servicesService = {
    getOfferedServices: async (
        serviceId: number,
        locationId?: number,
        minimumRating?: number,
        maximumPrice?: number
    ): Promise<AxiosResponse<GetOfferedServicesResponse>> => {
        const path = `${basePath}/${serviceId}/offered-services`;
        const params = new URLSearchParams();
        if (locationId !== undefined) {
            params.append('locationId', locationId.toString());
        }
        if (minimumRating !== undefined) {
            params.append('minimumRating', minimumRating.toString());
        }
        if (maximumPrice !== undefined) {
            params.append('maximumPrice', maximumPrice.toString());
        }
        try {
            return await httpClient.get<GetOfferedServicesResponse>(path, {
                params
            });
        } catch (error) {
            throw error;
        }
    }
};
