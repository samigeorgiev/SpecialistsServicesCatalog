import { User } from '../contexts/User/User';
import { Token } from 'react-stripe-checkout';
import { buildAuthorizationHeader, httpClient } from '../httpClient';
import { MakeStripePaymentRequest } from '../dtos/MakeStripePaymentRequest';

const basePath = 'payments';

export const paymentsService = {
    makeStripePayment: async (user: User, serviceRequestId: number, token: Token) => {
        const path = `${basePath}/stripe`;
        const request: MakeStripePaymentRequest = {
            serviceRequestId: serviceRequestId,
            token: token
        };
        try {
            return await httpClient.post<void>(path, request, {
                headers: {
                    ...buildAuthorizationHeader(user)
                }
            });
        } catch (error) {
            throw error;
        }
    }
};
