import React, { FunctionComponent } from 'react';
import { Card } from 'semantic-ui-react';
import styles from './CardFooter.module.scss';

interface Props {}

export const CardFooter: FunctionComponent<Props> = props => {
    return (
        <Card.Content className={styles.CardFooter} extra>
            <div>{props.children}</div>
        </Card.Content>
    );
};
