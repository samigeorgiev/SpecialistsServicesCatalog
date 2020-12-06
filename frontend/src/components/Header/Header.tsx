import React, { FunctionComponent } from 'react';
import { Toolbar } from './Toolbar';
import { useFacebookAuthentication } from '../../hooks/Authentication/useFacebookAuthentication';

export interface Props {}

export const Header: FunctionComponent<Props> = () => {
    const { redirectToFacebookLogin } = useFacebookAuthentication();

    return (
        <header>
            <Toolbar onFacebookLogin={redirectToFacebookLogin} />
        </header>
    );
};
