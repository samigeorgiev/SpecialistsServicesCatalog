import React, { FunctionComponent } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { UserMenu } from '../../components/UserPage/UserMenu';
import { routes } from './routes';
import styles from './UserPage.module.scss';

export const UserPage: FunctionComponent = () => {
    const { path, url } = useRouteMatch();
    const history = useHistory();

    const itemSelectHandler = (itemName: string): void => history.push(`${url}/${itemName}`);

    return (
        <div className={styles.UserPage}>
            {/* <WithMediaQuery maxWidth={800}> */}
            <div>
                <UserMenu onItemSelect={itemSelectHandler} items={routes} />
            </div>
            {/* </WithMediaQuery> */}
            <div>
                <Switch>
                    {routes
                        .flatMap(routesGroup => routesGroup.routes)
                        .map(route => (
                            <Route path={`${path}/${route.path}`} component={route.component} key={route.path} exact />
                        ))}
                </Switch>
            </div>
        </div>
    );
};
