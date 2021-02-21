import React, { FunctionComponent } from 'react';
import { Layout } from './components/Layout';
import { Routes } from './pages/Routes';

export const App: FunctionComponent = () => {
    return (
        <Layout>
            <Routes />
        </Layout>
    );
};
