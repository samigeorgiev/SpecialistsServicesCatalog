import React, { FunctionComponent, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { FacebookAuthorizationHandler } from './FacebookAuthorizationHandler';
import { Home } from './Home';
import { UserPage } from './UserPage';
import { UserContext } from '../contexts/User/UserContext';
import { Browse } from './Browse';
import {SharedServiceRequest} from "./SharedServiceRequest";

export const Routes: FunctionComponent = () => {
    const { user } = useContext(UserContext);

    return (
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path={process.env.REACT_APP_FACEBOOK_REDIRECT_URI} exact>
                <FacebookAuthorizationHandler />
            </Route>
            <Route path="/browse">
                <Browse />
            </Route>
            <Route path="/shared-service-request" exact>
                <SharedServiceRequest />
            </Route>
            {user !== null ? (
                <Route path="/user">
                    <UserPage />
                </Route>
            ) : null}
        </Switch>
    );
};
