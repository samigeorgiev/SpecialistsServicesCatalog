import React, { FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';
import { List } from 'semantic-ui-react';
import { ServiceRequestDto } from '../../../dtos/ServiceRequestDto';
import { specialistsService } from '../../../services/specialistsService';
import { UserContext } from '../../../contexts/User/UserContext';
import { toast } from 'react-toastify';

export interface Props {
    serviceRequestStatus: string;
    renderServiceRequestActions: (serviceRequest: ServiceRequestDto, getServiceRequests: () => void) => JSX.Element;
}

export const ServiceRequests: FunctionComponent<Props> = props => {
    const { user } = useContext(UserContext);
    const [serviceRequests, setServiceRequests] = useState<ServiceRequestDto[]>([]);

    const getServiceRequests = useCallback(() => {
        if (user === null) {
            throw new Error('User is null');
        }
        specialistsService
            .getServiceRequests(user, props.serviceRequestStatus)
            .then(response => {
                setServiceRequests(response.data.serviceRequests);
            })
            .catch(error => {
                toast.error(error.message);
            });
    }, [props.serviceRequestStatus, user]);

    useEffect(() => {
        getServiceRequests();
    }, [getServiceRequests]);

    return (
        <List divided relaxed>
            {serviceRequests.map(serviceRequest => (
                <List.Item key={serviceRequest.id}>
                    <List.Header>From {serviceRequest.requestorName}</List.Header>
                    <List.Content>
                        <p>Service: {serviceRequest.requestedService.service.name}</p>
                    </List.Content>
                    {props.renderServiceRequestActions(serviceRequest, getServiceRequests)}
                </List.Item>
            ))}
        </List>
    );
};
