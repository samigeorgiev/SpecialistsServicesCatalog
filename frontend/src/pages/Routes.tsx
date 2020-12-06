import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { FacebookAuthorizationHandler } from './FacebookAuthorizationHandler';
import { Home } from './Home';

export const Routes: FunctionComponent = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path={process.env.REACT_APP_FACEBOOK_REDIRECT_URI} exact>
                <FacebookAuthorizationHandler />
            </Route>
        </Switch>
    );
};
