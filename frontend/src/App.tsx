import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import { FacebookAuthorizationHandler } from './components/FacebookAuthorizationHandler';
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
                    <FacebookAuthorizationHandler />
                </Route>
            </Switch>
        </Layout>
    );
};
