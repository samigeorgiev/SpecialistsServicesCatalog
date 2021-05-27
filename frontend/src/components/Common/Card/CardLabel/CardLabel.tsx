import React, { FunctionComponent } from 'react';
import { Label } from 'semantic-ui-react';
import styles from './CardLabel.module.scss';

interface Props {}

export const CardLabel: FunctionComponent<Props> = props => {
    return (
        <Label className={styles.CardLabel} color="blue" ribbon>
            {props.children}
        </Label>
    );
};
