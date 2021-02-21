import React, { FunctionComponent, useContext } from 'react';
import { UserContext } from '../../../../contexts/User/UserContext';
import { ServiceRequestDto } from '../../../../dtos/ServiceRequestDto';
import { serviceRequestsService } from '../../../../services/serviceRequestsService';
import { toast } from 'react-toastify';
import { ServiceRequests } from '../ServiceRequests';
import { Button } from 'semantic-ui-react';
import { ServiceRequestStatus } from '../../../../dtos/ServiceRequestStatus';

export interface Props {}

export const ServiceRequestsInProgress: FunctionComponent<Props> = () => {
    const { user } = useContext(UserContext);

    const finishServiceRequestHandler = (serviceRequest: ServiceRequestDto, getServiceRequests: () => void) => {
        if (user === null) {
            throw new Error('User is null');
        }
        serviceRequestsService
            .finishServiceRequest(user, serviceRequest.id)
            .then(() => {
                toast.success('Service request accepted');
                getServiceRequests();
            })
            .catch(error => {
                toast.error(error.message);
            });
    };

    return (
        <ServiceRequests
            serviceRequestStatus={ServiceRequestStatus.IN_PROGRESS}
            renderServiceRequestActions={(serviceRequest, getServiceRequests) => (
                <Button onClick={() => finishServiceRequestHandler(serviceRequest, getServiceRequests)}>Finish</Button>
            )}
        />
    );
};
