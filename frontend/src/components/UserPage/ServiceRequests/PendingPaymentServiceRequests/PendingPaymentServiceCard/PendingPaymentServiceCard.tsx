import React, { FunctionComponent } from 'react';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import { Card } from 'semantic-ui-react';
import { ServiceRequestDto } from '../../../../../dtos/ServiceRequestDto';
import { CardContent } from '../../../../Common/Card/CardContent';
import { CardFooter } from '../../../../Common/Card/CardFooter';
import { CardHeader } from '../../../../Common/Card/CardHeader';
import { CardLabel } from '../../../../Common/Card/CardLabel';

interface Props {
    serviceRequest: ServiceRequestDto;
    onPayment: (token: Token, serviceRequest: ServiceRequestDto) => void;
}

export const PendingPaymentServiceCard: FunctionComponent<Props> = props => {
    const { serviceRequest, onPayment } = props;

    return (
        <Card key={serviceRequest.id} fluid>
            <CardLabel>{serviceRequest.requestedService.service.tag}</CardLabel>
            <CardContent>
                <CardHeader>{serviceRequest.requestedService.service.name}</CardHeader>
                <Card.Description>
                    <p>
                        <strong>from: </strong> {serviceRequest.requestorName}
                    </p>
                </Card.Description>
            </CardContent>
            <CardFooter>
                <span>{serviceRequest.requestedService.price}лв.</span>
                <StripeCheckout
                    amount={serviceRequest.requestedService.price * 100}
                    stripeKey={process.env.REACT_APP_STRIPE_KEY!}
                    token={(token: Token) => onPayment(token, serviceRequest)}
                    label="Pay"
                    allowRememberMe={false}
                    currency="BGN"
                    description="Pay for service request #23"
                    name="Specialist Service Catalog"
                />
            </CardFooter>
        </Card>
    );
};
