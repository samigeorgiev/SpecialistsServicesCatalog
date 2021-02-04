import React, { FunctionComponent } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { UserMenu } from '../../components/UserPage/UserMenu';
import { routes } from './routes';
import { Grid } from 'semantic-ui-react';

export const UserPage: FunctionComponent = () => {
    const { path, url } = useRouteMatch();
    const history = useHistory();

    const itemSelectHandler = (itemName: string): void => history.push(`${url}/${itemName}`);

    return (
        <Grid>
            <Grid.Column width={4}>
                <UserMenu onItemSelect={itemSelectHandler} items={routes} />
            </Grid.Column>
            <Grid.Column width={12}>
                <Switch>
                    {routes
                        .flatMap(routesGroup => routesGroup.routes)
                        .map(route => (
                            <Route path={`${path}/${route.path}`} component={route.component} key={route.path} exact />
                        ))}
                </Switch>
            </Grid.Column>
        </Grid>
    );
};
