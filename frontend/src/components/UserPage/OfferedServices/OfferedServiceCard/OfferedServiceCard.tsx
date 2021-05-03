import React, { FunctionComponent } from 'react';
import { Card, Icon, Label } from 'semantic-ui-react';
import { OfferedServiceDto } from '../../../../dtos/OfferedServiceDto';
import { CardContent } from '../../../Common/Card/CardContent';
import { CardFooter } from '../../../Common/Card/CardFooter';
import { CardHeader } from '../../../Common/Card/CardHeader';
import { CardLabel } from '../../../Common/Card/CardLabel';
import { PrepaidField } from '../../../Common/Card/PrepaidField';
import styles from './OfferedServiceCard.module.scss';

interface Props {
    offeredService: OfferedServiceDto;
}

export const OfferedServiceCard: FunctionComponent<Props> = props => {
    const { offeredService } = props;

    return (
        <Card fluid>
            <CardLabel>{offeredService.service.tag}</CardLabel>
            <CardContent>
                <CardHeader>{offeredService.service.name}</CardHeader>
                <Card.Description className={styles.CardDescpription}>
                    <PrepaidField isPrepaid={offeredService.prepaid} />
                </Card.Description>
            </CardContent>
            <CardFooter>
                <span>{offeredService.price}лв.</span>
            </CardFooter>
        </Card>
    );
};
