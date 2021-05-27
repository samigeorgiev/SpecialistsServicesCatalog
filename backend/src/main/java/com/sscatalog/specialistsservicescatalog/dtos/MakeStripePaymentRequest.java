package com.sscatalog.specialistsservicescatalog.dtos;

import com.stripe.model.Token;

public class MakeStripePaymentRequest {

    private long serviceRequestId;

    private Token token;

    public long getServiceRequestId() {
        return serviceRequestId;
    }

    public Token getToken() {
        return token;
    }
}
