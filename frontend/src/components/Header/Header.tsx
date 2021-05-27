import React, { FunctionComponent, useContext } from 'react';
import { AuthModalContext } from '../../contexts/AuthModal/AuthModalContext';
import { UserContext } from '../../contexts/User/UserContext';
import { AuthenticationModal } from '../AuthenticationModal';
import { Toolbar } from './Toolbar';

export const Header: FunctionComponent = () => {
    const { user } = useContext(UserContext);

    const { openAuthenticationModalHandler } = useContext(AuthModalContext);

    return (
        <header>
            <Toolbar onLogin={openAuthenticationModalHandler} isUserLoggedIn={user !== null} />
            <AuthenticationModal />
        </header>
    );
};
