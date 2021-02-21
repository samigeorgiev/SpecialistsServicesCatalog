import React, { FunctionComponent, useContext } from 'react';
import { ServiceRequests } from '../ServiceRequests';
import { Button } from 'semantic-ui-react';
import { ServiceRequestDto } from '../../../../dtos/ServiceRequestDto';
import { serviceRequestsService } from '../../../../services/serviceRequestsService';
import { toast } from 'react-toastify';
import { UserContext } from '../../../../contexts/User/UserContext';
import { ServiceRequestStatus } from '../../../../dtos/ServiceRequestStatus';

export interface Props {}

export const PendingServiceRequests: FunctionComponent<Props> = () => {
    const { user } = useContext(UserContext);

    const acceptServiceRequestHandler = (serviceRequest: ServiceRequestDto, getServiceRequests: () => void) => {
        if (user === null) {
            throw new Error('User is null');
        }
        serviceRequestsService
            .acceptServiceRequest(user, serviceRequest.id)
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
            serviceRequestStatus={ServiceRequestStatus.PENDING}
            renderServiceRequestActions={(serviceRequest, getServiceRequests) => (
                <Button onClick={() => acceptServiceRequestHandler(serviceRequest, getServiceRequests)}>Accept</Button>
            )}
        />
    );
};
