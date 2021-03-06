import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { UserContextProvider } from './contexts/User/UserContextProvider';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, ToastContainerProps } from 'react-toastify';
import { AuthModalContextProvider } from './contexts/AuthModal/AuthModalContextProvider';

const toastOptions: ToastContainerProps = {
    position: 'top-right'
};

const app = (
    <React.StrictMode>
        <BrowserRouter>
            <ToastContainer {...toastOptions} />
            <UserContextProvider>
                <AuthModalContextProvider>
                    <App />
                </AuthModalContextProvider>
            </UserContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
