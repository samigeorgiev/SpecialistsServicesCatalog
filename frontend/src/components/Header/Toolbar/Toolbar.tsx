import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import styles from './Toolbar.module.css';
import { UserActionsDropdown } from './UserActionsDropdown';

interface Props {
    onLogin: () => void;
    isUserLoggedIn: boolean;
}

export const Toolbar: FunctionComponent<Props> = props => {
    return (
        <Menu size="massive" className={styles.Menu} stackable borderless>
            <Menu.Item header>Specialists Services Catalog</Menu.Item>
            <Menu.Item>
                <NavLink to="/browse" className={styles.Link}>
                    Browse
                </NavLink>
            </Menu.Item>
            {props.isUserLoggedIn ? (
                <Menu.Item position="right">
                    <UserActionsDropdown />
                </Menu.Item>
            ) : (
                <Menu.Item onClick={props.onLogin} position="right">
                    Log in
                </Menu.Item>
            )}
        </Menu>
    );
};
