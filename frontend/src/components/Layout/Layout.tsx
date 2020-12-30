import React, { FunctionComponent } from 'react';
import { Header } from '../Header';
import styles from './Layout.module.css';

export const Layout: FunctionComponent = props => {
    return (
        <>
            <Header />
            <main className={styles.Main}>{props.children}</main>
        </>
    );
};
