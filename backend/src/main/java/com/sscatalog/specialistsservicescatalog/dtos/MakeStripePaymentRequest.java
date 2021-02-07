package com.sscatalog.specialistsservicescatalog.dtos;

public class MakeStripePaymentRequest {

     private long amount;

     private StripeToken token;

    public long getAmount() {
        return amount;
    }

    public StripeToken getToken() {
        return token;
    }
}
