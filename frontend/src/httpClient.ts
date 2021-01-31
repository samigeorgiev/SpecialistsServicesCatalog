import axois, { AxiosRequestConfig } from 'axios';
import { User } from './contexts/User/User';

const axoisConfig: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_API_BASE_URL
};

export const httpClient = axois.create(axoisConfig);

export const buildAuthorizationHeader = (user: User): Record<string, string> => ({
    Authorization: user.token
});
