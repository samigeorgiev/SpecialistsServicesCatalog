import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import { useLogout } from '../../../../hooks/UserActions/Logout/useLogout';
import styles from './UserActionsDropdown.module.scss';

export const UserActionsDropdown: FunctionComponent = () => {
    const history = useHistory();
    const onUserItemClick = () => history.push('/user');

    const { doLogout } = useLogout();

    return (
        <Dropdown className={styles.root} inline icon="user circle" direction="left">
            <Dropdown.Menu>
                <Dropdown.Item onClick={onUserItemClick}>User</Dropdown.Item>
                <Dropdown.Item onClick={doLogout}>Log out</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};
