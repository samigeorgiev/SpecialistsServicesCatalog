import React, { FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../contexts/User/UserContext';
import { ServiceRequestDto } from '../../../../dtos/ServiceRequestDto';
import { specialistsService } from '../../../../services/specialistsService';
import { toast } from 'react-toastify';
import { List } from 'semantic-ui-react';
import { usersService } from '../../../../services/usersService';

export interface Props {}

export const PendingPaymentServiceRequests: FunctionComponent<Props> = () => {
    const { user } = useContext(UserContext);
    const [serviceRequests, setServiceRequests] = useState<ServiceRequestDto[]>([]);

    const getServiceRequests = useCallback(() => {
        if (user === null) {
            throw new Error('User is null');
        }
        usersService
            .getServiceRequests(user, 'FINISHED', false)
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

    return (
        <List divided relaxed>
            {serviceRequests.map(serviceRequest => (
                <List.Item key={serviceRequest.id}>
                    <List.Header>{serviceRequest.requestedService.price}</List.Header>
                    <List.Content>
                        <p>Service: {serviceRequest.requestedService.service.name}</p>
                    </List.Content>
                </List.Item>
            ))}
        </List>
    );
};
