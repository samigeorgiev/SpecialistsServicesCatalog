import React, { FunctionComponent } from 'react';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import { Layout } from './components/Layout';
import { httpClient } from './httpClient';
import {Routes} from "./pages/Routes";

export const App: FunctionComponent = () => {
    const stripeKey =
        'pk_test_51II8FYARlvoNFDxNrfFzepXnqHRWfyGx1KyYYYNjOwuQOO6jW9njdgvjUDnhhUynBNh4DjStNcYtRr9F2pb2b3a800OZG0uAFs';

    return (
        <Layout>
            <Routes />
            {/*<StripeCheckout*/}
            {/*    amount={10000}*/}
            {/*    stripeKey={stripeKey}*/}
            {/*    token={paymentHandler}*/}
            {/*    label="Pay"*/}
            {/*    allowRememberMe={false}*/}
            {/*    currency="BGN"*/}
            {/*    description="Pay for service request #23"*/}
            {/*    name="Specialist Service Catalog"*/}
            {/*/>*/}
        </Layout>
    );
};
