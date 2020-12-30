import React, { FunctionComponent } from 'react';
import { Layout } from './components/Layout';
import { Routes } from './pages/Routes';

export interface Props {}

export const App: FunctionComponent<Props> = () => {
    return (
        <Layout>
            <Routes />
        </Layout>
    );
};
