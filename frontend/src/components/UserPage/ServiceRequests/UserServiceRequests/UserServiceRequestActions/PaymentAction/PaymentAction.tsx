import React, { FunctionComponent, useContext } from 'react';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import { ServiceRequestDto } from '../../../../../../dtos/ServiceRequestDto';
import { paymentsService } from '../../../../../../services/paymentsService';
import { toast } from 'react-toastify';
import { UserContext } from '../../../../../../contexts/User/UserContext';
import { AuthModalContext } from '../../../../../../contexts/AuthModal/AuthModalContext';

export interface Props {
    serviceRequest: ServiceRequestDto;
    onActionSuccess: () => void;
}

export const PaymentAction: FunctionComponent<Props> = props => {
    const { user } = useContext(UserContext);
    const { openAuthenticationModalHandler } = useContext(AuthModalContext);

    const paymentHandler = (token: Token) => {
        if (user === null) {
            // throw new Error('User is null');
            openAuthenticationModalHandler();
            return;
        }
        paymentsService
            .makeStripePayment(user, props.serviceRequest.id, token)
            .then(() => {
                // toast.success('Successful payment');
                props.onActionSuccess();
            })
            .catch(error => {
                toast.error('Error: Payment failed.');
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
