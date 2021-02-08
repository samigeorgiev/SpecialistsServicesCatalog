package com.sscatalog.specialistsservicescatalog.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@ConfigurationProperties("payments")
@ConstructorBinding
public class PaymentsProperties {

    private final String stripeSecretKey;

    private final String SpecialistsPayoutsCron;

    public PaymentsProperties(String stripeSecretKey, String specialistsPayoutsCron) {
        this.stripeSecretKey = stripeSecretKey;
        SpecialistsPayoutsCron = specialistsPayoutsCron;
    }

    public String getStripeSecretKey() {
        return stripeSecretKey;
    }

    public String getSpecialistsPayoutsCron() {
        return SpecialistsPayoutsCron;
    }
}
