import React, { FunctionComponent } from 'react';
import { Dropdown } from 'semantic-ui-react';
import {useBecomeSpecialist} from "../../hooks/UserActions/useBecomeSpecialist";

export interface Props {}

export const UserActionsDropdown: FunctionComponent<Props> = () => {
    const becomeSpecialist = useBecomeSpecialist();

    return (
        <Dropdown inline icon="user" direction="left">
            <Dropdown.Menu>
                <Dropdown.Item onClick={becomeSpecialist.doBecomeSpecialist}>Become specialist</Dropdown.Item>
                <Dropdown.Item>Log out</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};
