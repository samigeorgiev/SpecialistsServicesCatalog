import { Token } from 'react-stripe-checkout';

export interface MakeStripePaymentRequest {
    serviceRequestId: number;
    token: Token;
}
