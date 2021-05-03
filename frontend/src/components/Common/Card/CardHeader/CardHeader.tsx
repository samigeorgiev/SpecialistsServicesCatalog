import React, { FunctionComponent } from 'react';
import { Card } from 'semantic-ui-react';
import styles from './CardHeader.module.scss';

interface Props {}

export const CardHeader: FunctionComponent<Props> = props => {
    return <Card.Header className={styles.CradHeader}>{props.children}</Card.Header>;
};
