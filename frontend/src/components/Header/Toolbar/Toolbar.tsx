import React, { FunctionComponent } from 'react';
import { Button, Menu } from 'semantic-ui-react';

export interface Props {
    onFacebookLogin: () => void;
}

export const Toolbar: FunctionComponent<Props> = props => {
    return (
        <Menu>
            <Menu.Item>
                <Button
                    onClick={props.onFacebookLogin}
                    content="Login with Facebook"
                    icon="facebook"
                    color="facebook"
                />
            </Menu.Item>
        </Menu>
    );
};
