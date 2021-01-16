import React, { FunctionComponent } from 'react';
import { Button } from 'semantic-ui-react';
import styles from './index.module.css';
import { useBecomeSpecialist } from '../../../hooks/UserActions/BecomeSpecialist/useBecomeSpecialist';

export const BecomeSpecialist: FunctionComponent = () => {
    const { doBecomeSpecialist } = useBecomeSpecialist();

    return (
        <Button onClick={doBecomeSpecialist} className={styles.BecomeSpecialist}>
            Become specialist
        </Button>
    );
};
