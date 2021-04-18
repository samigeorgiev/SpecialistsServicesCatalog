import React, { FunctionComponent, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { serviceRequestsService } from '../../services/serviceRequestsService';
import { ServiceRequestDto } from '../../dtos/ServiceRequestDto';
import { toast } from 'react-toastify';

export interface Props {}

export const SharedServiceRequest: FunctionComponent<Props> = () => {
    const [serviceRequest, setServiceRequest] = useState<ServiceRequestDto>();
    const { search } = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(search);
        const serviceRequestId = queryParams.get('serviceRequestId');
        if (serviceRequestId === null) {
            throw new Error('ServiceRequests is null');
        }
        serviceRequestsService
            .getServiceRequest(+serviceRequestId)
            .then(response => {
                setServiceRequest(response.data.serviceRequest);
            })
            .catch(error => {
                toast.error(error.message);
            });
    }, [search]);

    return serviceRequest === undefined ? (
        <h1>Loading...</h1>
    ) : (
        <>
            <h2>Specialist: {serviceRequest.requestedService.service.name}</h2>
            <p>Rating: {serviceRequest.rating}</p>
            <p>Comment :{serviceRequest.comment}</p>
        </>
    );
};
