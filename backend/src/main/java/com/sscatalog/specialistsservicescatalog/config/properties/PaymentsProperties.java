package com.sscatalog.specialistsservicescatalog.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@ConfigurationProperties("payments")
@ConstructorBinding
public class PaymentsProperties {

    private final String stripeSecretKey;

    private final String specialistsPayoutsCron;

    public PaymentsProperties(String stripeSecretKey, String specialistsPayoutsCron) {
        this.stripeSecretKey = stripeSecretKey;
        this.specialistsPayoutsCron = specialistsPayoutsCron;
    }

    public String getStripeSecretKey() {
        return stripeSecretKey;
    }

    public String getSpecialistsPayoutsCron() {
        return specialistsPayoutsCron;
    }
}
