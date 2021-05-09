import { httpClient } from '../httpClient';
import { AxiosResponse } from 'axios';
import { GetLocationsResponse } from '../dtos/GetLocationsResponse';

const basePath = '/locations';

export const locationsService = {
    getLocations: async (): Promise<AxiosResponse<GetLocationsResponse>> => {
        const path = `${basePath}`;
        try {
            return await httpClient.get<GetLocationsResponse>(path);
        } catch (error) {
            throw error;
        }
    }
};
