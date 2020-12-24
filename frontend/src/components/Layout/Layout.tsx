import React, { FunctionComponent } from 'react';
import { Header } from '../Header';

export interface Props {}

export const Layout: FunctionComponent<Props> = props => {
    return (
        <>
            <Header />
            <main>{props.children}</main>
        </>
    );
};
