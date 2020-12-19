import React, { FunctionComponent } from 'react';
import { Toolbar } from './Toolbar';
import { useFacebookOAuth2 } from '../../hooks/OAuth2/useFacebookOAuth2';

export interface Props {}

export const Header: FunctionComponent<Props> = () => {
    const { redirectToFacebookLogin } = useFacebookOAuth2();

    return (
        <header>
            <Toolbar onFacebookLogin={redirectToFacebookLogin} />
        </header>
    );
};
