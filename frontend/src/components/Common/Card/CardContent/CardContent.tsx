import React, { FunctionComponent } from 'react';
import { Card } from 'semantic-ui-react';
import styles from './CardContent.module.scss';

interface Props {}

export const CardContent: FunctionComponent<Props> = props => {
    return <Card.Content className={styles.CardContent}>{props.children}</Card.Content>;
};
