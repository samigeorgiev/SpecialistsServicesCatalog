import React, { FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../contexts/User/UserContext';
import { ServiceRequestDto } from '../../../../dtos/ServiceRequestDto';
import { usersService } from '../../../../services/usersService';
import { toast } from 'react-toastify';
import { Token } from 'react-stripe-checkout';
import { paymentsService } from '../../../../services/paymentsService';
import {DropdownItemProps, List, Select} from 'semantic-ui-react';
import { UserServiceRequestActions } from './UserServiceRequestActions';

export const UserServiceRequests: FunctionComponent = () => {
    const { user } = useContext(UserContext);
    const [serviceRequests, setServiceRequests] = useState<ServiceRequestDto[]>([]);
    const [status, setStatus] = useState<string>();
    const [paid, setPaid] = useState<boolean>();

    const getServiceRequests = useCallback(() => {
        if (user === null) {
            throw new Error('User is null');
        }
        usersService
            .getServiceRequests(user, status, paid)
            .then(response => {
                setServiceRequests(response.data.serviceRequests);
            })
            .catch(error => {
                toast.error(error.message);
            });
    }, [paid, status, user]);

    useEffect(() => {
        getServiceRequests();
    }, [getServiceRequests]);

    return (
        <>
            <Select options={} />
            <List divided relaxed>
                {serviceRequests.map(serviceRequest => (
                    <List.Item key={serviceRequest.id}>
                        <List.Header>{'Specialist name'}</List.Header>
                        <List.Content>
                            <p>Service: {serviceRequest.requestedService.service.name}</p>
                            <UserServiceRequestActions serviceRequest={serviceRequest} />
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        </>
    );
};
