import React, { FunctionComponent } from 'react';
import { Card, Icon, Label } from 'semantic-ui-react';
import { CardLabel } from '../../../Common/Card/CardLabel';
import styles from './AddServiceCard.module.scss';

interface Props {
    onClick: () => void;
}

export const AddServiceCard: FunctionComponent<Props> = props => {
    return (
        <Card className={styles.Card} fluid>
            <CardLabel>Add Service</CardLabel>
            <Card.Content onClick={props.onClick} className={styles.CardContent}>
                <Icon name="add" />
            </Card.Content>
        </Card>
    );
};
