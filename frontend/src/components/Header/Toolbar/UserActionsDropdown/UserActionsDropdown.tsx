import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';

export const UserActionsDropdown: FunctionComponent = () => {
    const history = useHistory();

    const onUserItemClick = () => history.push('/user');

    return (
        <Dropdown inline icon="user" direction="left">
            <Dropdown.Menu>
                <Dropdown.Item onClick={onUserItemClick}>User</Dropdown.Item>
                <Dropdown.Item>Log out</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};
