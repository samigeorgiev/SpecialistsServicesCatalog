import React from 'react';
import { AuthModalState } from './AuthModalState';

export const AuthModalContext = React.createContext<AuthModalState>({} as AuthModalState);
