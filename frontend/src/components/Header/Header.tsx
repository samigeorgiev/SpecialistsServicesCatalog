import React, { FunctionComponent, useContext, useState } from 'react';
import { Toolbar } from './Toolbar';
import { AuthenticationModal } from '../AuthenticationModal';
import { UserContext } from '../../contexts/User/UserContext';

export interface Props {}

export const Header: FunctionComponent<Props> = () => {
    const { user } = useContext(UserContext);

    const [authenticationModalOpen, setAuthenticationModalOpen] = useState(false);
    const openAuthenticationModalHandler = () => setAuthenticationModalOpen(true);
    const closeAuthenticationModalHandler = () => setAuthenticationModalOpen(false);

    return (
        <header>
            <Toolbar onLogin={openAuthenticationModalHandler} isUserLoggedIn={user !== null} />
            <AuthenticationModal open={authenticationModalOpen} onClose={closeAuthenticationModalHandler} />
        </header>
    );
};
