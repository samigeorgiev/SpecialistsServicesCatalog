import React, { FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';
import { Token } from 'react-stripe-checkout';
import { toast } from 'react-toastify';
import { AuthModalContext } from '../../../../contexts/AuthModal/AuthModalContext';
import { UserContext } from '../../../../contexts/User/UserContext';
import { ServiceRequestDto } from '../../../../dtos/ServiceRequestDto';
import { ServiceRequestStatus } from '../../../../dtos/ServiceRequestStatus';
import { paymentsService } from '../../../../services/paymentsService';
import { usersService } from '../../../../services/usersService';
import { CardList } from '../../../Common/Card/CardList/CardList';
import { PendingPaymentServiceCard } from './PendingPaymentServiceCard';

export interface Props {}

export const PendingPaymentServiceRequests: FunctionComponent<Props> = () => {
    const { user } = useContext(UserContext);
    const { openAuthenticationModalHandler } = useContext(AuthModalContext);
    const [serviceRequests, setServiceRequests] = useState<ServiceRequestDto[]>([]);

    const getServiceRequests = useCallback(() => {
        if (user === null) {
            // throw new Error('User is null');
            openAuthenticationModalHandler();
            return;
        }
        usersService
            .getServiceRequests(user, ServiceRequestStatus.FINISHED, false)
            .then(response => {
                setServiceRequests(response.data.serviceRequests);
            })
            .catch(error => {
                toast.error('Error: Could not get services');
            });
    }, [user, openAuthenticationModalHandler]);

    useEffect(() => {
        getServiceRequests();
    }, [getServiceRequests]);

    const paymentHandler = (token: Token, serviceRequest: ServiceRequestDto) => {
        if (user === null) {
            // throw new Error('User is null');
            openAuthenticationModalHandler();
            return;
        }
        paymentsService
            .makeStripePayment(user, serviceRequest.id, token)
            // .then(() => {
            //     toast.success('Successful payment');
            //     getServiceRequests();
            // })
            .catch(error => {
                toast.error('Error: Payment failed.');
            });
    };

    return (
        <CardList>
            {serviceRequests.map(serviceRequest => (
                <PendingPaymentServiceCard serviceRequest={serviceRequest} onPayment={paymentHandler} />
            ))}
        </CardList>
    );
};
