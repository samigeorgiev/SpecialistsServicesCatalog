import React, { FunctionComponent } from 'react';
import { Card } from 'semantic-ui-react';
import styles from './CardList.module.scss';

interface Props {}

export const CardList: FunctionComponent<Props> = props => {
    return <Card.Group className={styles.CradGroup}>{props.children}</Card.Group>;
};
