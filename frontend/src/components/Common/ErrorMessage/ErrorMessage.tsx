import React, { FunctionComponent } from 'react';
import { Message } from 'semantic-ui-react';
import styles from './ErrorMessage.module.css';

export interface Props {
    header: string;
    content: string;
}

export const ErrorMessage: FunctionComponent<Props> = props => {
    return <Message header={props.header} content={props.content} className={styles.ErrorMessage} negative />;
};
