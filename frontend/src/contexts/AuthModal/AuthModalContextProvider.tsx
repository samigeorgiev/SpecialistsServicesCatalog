import React, { FunctionComponent, useState } from 'react';
import { AuthModalContext } from './AuthModalContext';

interface Props {}

export const AuthModalContextProvider: FunctionComponent<Props> = props => {
    const [authenticationModalOpen, setAuthenticationModalOpen] = useState(false);
    const openAuthenticationModalHandler = () => setAuthenticationModalOpen(true);
    const closeAuthenticationModalHandler = () => setAuthenticationModalOpen(false);

    return (
        <AuthModalContext.Provider
            value={{ authenticationModalOpen, closeAuthenticationModalHandler, openAuthenticationModalHandler }}>
            {props.children}
        </AuthModalContext.Provider>
    );
};
