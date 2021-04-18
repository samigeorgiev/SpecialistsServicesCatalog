import React, { FunctionComponent, useContext } from 'react';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import { ServiceRequestDto } from '../../../../../../dtos/ServiceRequestDto';
import { paymentsService } from '../../../../../../services/paymentsService';
import { toast } from 'react-toastify';
import { UserContext } from '../../../../../../contexts/User/UserContext';

export interface Props {
    serviceRequest: ServiceRequestDto;
}

export const PaymentAction: FunctionComponent<Props> = props => {
    const { user } = useContext(UserContext);

    const paymentHandler = (token: Token) => {
        if (user === null) {
            throw new Error('User is null');
        }
        paymentsService
            .makeStripePayment(user, props.serviceRequest.id, token)
            .then(() => {
                toast.success('Successful payment');
            })
            .catch(error => {
                toast.error(error.message);
            });
    };

    return (
        <StripeCheckout
            amount={props.serviceRequest.requestedService.price * 100}
            stripeKey={process.env.REACT_APP_STRIPE_KEY!}
            token={paymentHandler}
            label="Pay"
            allowRememberMe={false}
            currency="BGN"
            description="Pay for service request #23"
            name="Specialist Service Catalog"
        />
    );
};
