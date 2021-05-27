import React, { FunctionComponent, useContext } from 'react';
import { Button, Container, Modal } from 'semantic-ui-react';
import { AuthModalContext } from '../../contexts/AuthModal/AuthModalContext';
import { useFacebookOAuth2 } from '../../hooks/OAuth2/useFacebookOAuth2';

export const AuthenticationModal: FunctionComponent = props => {
    const { redirectToFacebookLogin } = useFacebookOAuth2();

    const { authenticationModalOpen, closeAuthenticationModalHandler } = useContext(AuthModalContext);

    return (
        <Modal open={authenticationModalOpen} onClose={closeAuthenticationModalHandler} size="tiny" centered={false}>
            <Modal.Header>Authentication methods</Modal.Header>
            <Modal.Content>
                <Container textAlign="center">
                    <Button
                        onClick={redirectToFacebookLogin}
                        content="Login with Facebook"
                        icon="facebook"
                        color="facebook"
                        size="large"
                    />
                </Container>
            </Modal.Content>
        </Modal>
    );
};
