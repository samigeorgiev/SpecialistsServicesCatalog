import React, { FunctionComponent } from 'react';
import { Button, Container, Modal } from 'semantic-ui-react';
import { useFacebookOAuth2 } from '../../hooks/OAuth2/useFacebookOAuth2';

interface Props {
    open: boolean;
    onClose: () => void;
}

export const AuthenticationModal: FunctionComponent<Props> = props => {
    const { redirectToFacebookLogin } = useFacebookOAuth2();

    return (
        <Modal open={props.open} onClose={props.onClose} size="tiny" centered={false}>
            <Modal.Header>Authentication methods</Modal.Header>
            <Modal.Content>
                <Container textAlign="center">
                    <Button
                        onClick={redirectToFacebookLogin}
                        content="Login with Facebook"
                        icon="facebook"
                        color="facebook"
                    />
                </Container>
            </Modal.Content>
        </Modal>
    );
};
