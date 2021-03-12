import React, {FunctionComponent, useEffect} from 'react';
import { Layout } from './components/Layout';
import { Routes } from './pages/Routes';
import {useLogin} from "./hooks/UserActions/Login/useLogin";

export const App: FunctionComponent = () => {
    const { doLogin } = useLogin();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const expiration_date = localStorage.getItem('expiration_date');
        if (token == null || expiration_date == null || new Date(expiration_date) < new Date()) {
            return;
        }
        doLogin(token, new Date(expiration_date).getTime() - Date.now())
    }, [doLogin]);

    return (
        <Layout>
            <Routes />
        </Layout>
    );
};
