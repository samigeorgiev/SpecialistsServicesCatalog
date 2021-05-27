import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import styles from './Toolbar.module.scss';
import { UserActionsDropdown } from './UserActionsDropdown';

interface Props {
    onLogin: () => void;
    isUserLoggedIn: boolean;
}

export const Toolbar: FunctionComponent<Props> = props => {
    return (
        <div className={styles.root}>
            <Menu size="massive" className={styles.Menu} stackable borderless>
                <Menu.Item className={styles.Logo} as={Link} to="/" header>
                    Specialists Services Catalog
                </Menu.Item>
                <Menu.Item as={Link} to="/browse">
                    Browse
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
        </div>
    );
};
