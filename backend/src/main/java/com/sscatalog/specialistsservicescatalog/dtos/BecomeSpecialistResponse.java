package com.sscatalog.specialistsservicescatalog.dtos;

public class BecomeSpecialistResponse {

    private final String stripeAccountLink;

    public BecomeSpecialistResponse(String stripeAccountLink) {
        this.stripeAccountLink = stripeAccountLink;
    }

    public String getStripeAccountLink() {
        return stripeAccountLink;
    }
}
