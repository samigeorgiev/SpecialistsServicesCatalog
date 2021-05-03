import React, { FunctionComponent } from 'react';
import { Icon } from 'semantic-ui-react';
import styles from './PrepaidField.module.scss';

interface Props {
    isPrepaid: boolean;
}

export const PrepaidField: FunctionComponent<Props> = props => {
    return (
        <p className={styles.Prepaid}>
            Prepaid:
            {props.isPrepaid ? (
                <Icon color="green" name="check circle outline" />
            ) : (
                <Icon color="red" name="times circle outline" />
            )}
        </p>
    );
};
