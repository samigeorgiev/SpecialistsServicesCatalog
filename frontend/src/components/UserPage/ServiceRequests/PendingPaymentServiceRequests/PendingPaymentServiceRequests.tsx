import React, { FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../contexts/User/UserContext';
import { ServiceRequestDto } from '../../../../dtos/ServiceRequestDto';
import { toast } from 'react-toastify';
import { List } from 'semantic-ui-react';
import { usersService } from '../../../../services/usersService';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import { paymentsService } from '../../../../services/paymentsService';
import { ServiceRequestStatus } from '../../../../dtos/ServiceRequestStatus';

export interface Props {}

export const PendingPaymentServiceRequests: FunctionComponent<Props> = () => {
    const { user } = useContext(UserContext);
    const [serviceRequests, setServiceRequests] = useState<ServiceRequestDto[]>([]);

    const getServiceRequests = useCallback(() => {
        if (user === null) {
            throw new Error('User is null');
        }
        usersService
            .getServiceRequests(user, ServiceRequestStatus.FINISHED, false)
            .then(response => {
                setServiceRequests(response.data.serviceRequests);
            })
            .catch(error => {
                toast.error(error.message);
            });
    }, [user]);

    useEffect(() => {
        getServiceRequests();
    }, [getServiceRequests]);

    const paymentHandler = (token: Token, serviceRequest: ServiceRequestDto) => {
        if (user === null) {
            throw new Error('User is null');
        }
        paymentsService
            .makeStripePayment(user, serviceRequest.id, token)
            .then(() => {
                toast.success('Successful payment');
                getServiceRequests();
            })
            .catch(error => {
                toast.error(error.message);
            });
    };

    return (
        <List divided relaxed>
            {serviceRequests.map(serviceRequest => (
                <List.Item key={serviceRequest.id}>
                    <List.Header>{serviceRequest.requestedService.price}</List.Header>
                    <List.Content>
                        <p>Service: {serviceRequest.requestedService.service.name}</p>
                        <StripeCheckout
                            amount={serviceRequest.requestedService.price * 100}
                            stripeKey={process.env.REACT_APP_STRIPE_KEY!}
                            token={(token: Token) => paymentHandler(token, serviceRequest)}
                            label="Pay"
                            allowRememberMe={false}
                            currency="BGN"
                            description="Pay for service request #23"
                            name="Specialist Service Catalog"
                        />
                    </List.Content>
                </List.Item>
            ))}
        </List>
    );
};
