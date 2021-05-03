import React, { FunctionComponent } from 'react';
import { Button, Card } from 'semantic-ui-react';
import { OfferedServiceDto } from '../../../dtos/OfferedServiceDto';
import { CardContent } from '../../Common/Card/CardContent';
import { CardFooter } from '../../Common/Card/CardFooter';
import { CardHeader } from '../../Common/Card/CardHeader';
import { CardLabel } from '../../Common/Card/CardLabel';
import { PrepaidField } from '../../Common/Card/PrepaidField';

interface Props {
    offeredService: OfferedServiceDto;
    onServiceRequest: (requestedServiceId: number) => void;
}

export const SpecialistCard: FunctionComponent<Props> = props => {
    const { offeredService, onServiceRequest } = props;

    return (
        <Card fluid>
            <CardLabel>{offeredService.service.tag}</CardLabel>
            <CardContent>
                <CardHeader>{offeredService.specialist.name}</CardHeader>
                <Card.Description>
                    <p>
                        <strong>Service: </strong> {offeredService.service.name}
                    </p>
                    <PrepaidField isPrepaid={offeredService.prepaid} />
                </Card.Description>
            </CardContent>
            <CardFooter>
                <span>{offeredService.price}лв.</span>
                <Button primary onClick={() => onServiceRequest(offeredService.id)}>
                    Request
                </Button>
            </CardFooter>
        </Card>
    );
};
