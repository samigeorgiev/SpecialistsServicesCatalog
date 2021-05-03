import React, { FunctionComponent } from 'react';
import { Card } from 'semantic-ui-react';
import { ServiceRequestDto } from '../../../../../dtos/ServiceRequestDto';
import { CardContent } from '../../../../Common/Card/CardContent';
import { CardFooter } from '../../../../Common/Card/CardFooter';
import { CardHeader } from '../../../../Common/Card/CardHeader';
import { CardLabel } from '../../../../Common/Card/CardLabel';
import { UserServiceRequestActions } from '../UserServiceRequestActions';

interface Props {
    serviceRequest: ServiceRequestDto;
    onActionSuccess: () => void;
}

export const UserServiceRequestCard: FunctionComponent<Props> = props => (
    <Card fluid>
        <CardLabel>{props.serviceRequest.requestedService.service.tag}</CardLabel>
        <CardContent>
            <CardHeader>{props.serviceRequest.requestedService.service.name}</CardHeader>
            <Card.Description>
                <p>
                    <strong>from: </strong> {props.serviceRequest.requestorName}
                </p>
            </Card.Description>
        </CardContent>
        <CardFooter>
            <span>{props.serviceRequest.requestedService.price}лв.</span>
            <UserServiceRequestActions onActionSuccess={props.onActionSuccess} serviceRequest={props.serviceRequest} />
        </CardFooter>
    </Card>
);
