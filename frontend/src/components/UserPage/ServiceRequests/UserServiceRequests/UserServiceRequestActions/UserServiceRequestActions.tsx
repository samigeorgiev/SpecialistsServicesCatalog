import React, {FunctionComponent} from 'react';
import {ServiceRequestDto} from '../../../../../dtos/ServiceRequestDto';
import {ServiceRequestStatus} from '../../../../../dtos/ServiceRequestStatus';
import {PaymentAction} from './PaymentAction';
import {RateCommentAction} from './RateCommentAction';
import {ShareAction} from './ShareAction';

export interface Props {
    serviceRequest: ServiceRequestDto;
    onActionSuccess: () => void;
}

export const UserServiceRequestActions: FunctionComponent<Props> = props => {
    const {serviceRequest} = props;
    const actions: JSX.Element[] = [];

    if (isServiceRequestPayable(serviceRequest)) {
        actions.push(<PaymentAction key={1} onActionSuccess={props.onActionSuccess} serviceRequest={serviceRequest}/>);
    }
    if (
            serviceRequest.status === ServiceRequestStatus.FINISHED &&
            serviceRequest.paid &&
            serviceRequest.comment === null &&
            serviceRequest.rating === 0
    ) {
        actions.push(
                <RateCommentAction key={2} onActionSuccess={props.onActionSuccess} serviceRequest={serviceRequest}/>
        );
    }
    if (serviceRequest.comment !== null || serviceRequest.rating !== 0) {
        actions.push(<ShareAction key={3} serviceRequest={serviceRequest}/>);
    }

    return <>{actions}</>;
};

const isServiceRequestPayable = (serviceRequest: ServiceRequestDto) => {
    return (
            (
                    (!serviceRequest.requestedService.prepaid && serviceRequest.status === ServiceRequestStatus.FINISHED) ||
                    (serviceRequest.requestedService.prepaid &&
                            serviceRequest.status === ServiceRequestStatus.IN_PROGRESS)) &&
            !serviceRequest.paid
    );
};
