import React, { FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Card } from 'semantic-ui-react';
import { AuthModalContext } from '../../../contexts/AuthModal/AuthModalContext';
import { UserContext } from '../../../contexts/User/UserContext';
import { ServiceRequestDto } from '../../../dtos/ServiceRequestDto';
import { ServiceRequestStatus } from '../../../dtos/ServiceRequestStatus';
import { specialistsService } from '../../../services/specialistsService';
import { CardContent } from '../../Common/Card/CardContent';
import { CardFooter } from '../../Common/Card/CardFooter';
import { CardHeader } from '../../Common/Card/CardHeader';
import { CardLabel } from '../../Common/Card/CardLabel';
import { CardList } from '../../Common/Card/CardList/CardList';
import { PrepaidField } from '../../Common/Card/PrepaidField';

export interface Props {
    serviceRequestStatus: ServiceRequestStatus;
    renderServiceRequestActions: (serviceRequest: ServiceRequestDto, getServiceRequests: () => void) => JSX.Element;
}

export const ServiceRequests: FunctionComponent<Props> = props => {
    const { user } = useContext(UserContext);
    const { openAuthenticationModalHandler } = useContext(AuthModalContext);
    const [serviceRequests, setServiceRequests] = useState<ServiceRequestDto[]>([]);

    const getServiceRequests = useCallback(() => {
        if (user === null) {
            openAuthenticationModalHandler();
            return;
        }
        specialistsService
            .getServiceRequests(user, props.serviceRequestStatus)
            .then(response => {
                setServiceRequests(response.data.serviceRequests);
            })
            .catch(error => {
                toast.error('Error: Could not get services.');
            });
    }, [props.serviceRequestStatus, user, openAuthenticationModalHandler]);

    useEffect(() => {
        getServiceRequests();
    }, [getServiceRequests]);

    return (
        <CardList>
            {serviceRequests.map(serviceRequest => (
                <Card key={serviceRequest.id} fluid>
                    <CardLabel>{serviceRequest.requestedService.service.tag}</CardLabel>
                    <CardContent>
                        <CardHeader>{serviceRequest.requestedService.service.name}</CardHeader>
                        <Card.Description>
                            <p>
                                <strong>from: </strong> {serviceRequest.requestorName}
                            </p>
                            <PrepaidField isPrepaid={serviceRequest.requestedService.prepaid} />
                        </Card.Description>
                    </CardContent>
                    <CardFooter>
                        <span>{serviceRequest.requestedService.price}лв.</span>
                        {props.renderServiceRequestActions(serviceRequest, getServiceRequests)}
                    </CardFooter>
                </Card>
            ))}
        </CardList>
    );
};
