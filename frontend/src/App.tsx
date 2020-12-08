import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import { FacebookAuthenticationHandler } from './components/FacebookAuthenticationHandler';
import { Home } from './pages';

export interface Props {}

export const App: FunctionComponent<Props> = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path={process.env.REACT_APP_FACEBOOK_REDIRECT_URI}>
                    <FacebookAuthenticationHandler />
                </Route>
            </Switch>
        </Layout>
    );
};
