import React, { FunctionComponent } from 'react';
import { Header } from '../Header';
import styles from './Layout.module.css';

export interface Props {}

export const Layout: FunctionComponent<Props> = props => {
    return (
        <>
            <Header />
            <main className={styles.Main}>{props.children}</main>
        </>
    );
};
