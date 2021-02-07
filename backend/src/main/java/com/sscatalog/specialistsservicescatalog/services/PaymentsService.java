package com.sscatalog.specialistsservicescatalog.services;

import com.sscatalog.specialistsservicescatalog.dtos.MakeStripePaymentRequest;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;
import com.stripe.model.AccountLink;
import com.stripe.param.AccountCreateParams;
import com.stripe.param.AccountLinkCreateParams;
import org.springframework.stereotype.Service;

@Service
public class PaymentsService {

    public PaymentsService() {
        Stripe.apiKey =
                "sk_test_51II8FYARlvoNFDxNWEQ6BiODLI6SXC6Bn1HEfLJ99uBnjezkpiXpryaENDIITJEQ7AtY8E66ZoTSl8HmZ5eBcBHl00dDsEjNPJ";
    }

    public String makeStripePayment(MakeStripePaymentRequest request) throws StripeException {
        AccountCreateParams.Capabilities accountCapabilities = AccountCreateParams.Capabilities.builder()
                                                                                               .build();
        AccountCreateParams params = AccountCreateParams.builder()
                                                        .setType(AccountCreateParams.Type.STANDARD)
                                                        .setCapabilities(accountCapabilities)
                                                        .build();
        Account account = Account.create(params);

        AccountLinkCreateParams accountLinkCreateParams = AccountLinkCreateParams.builder()
                                                                                 .setAccount(account.getId())
                                                                                 .setRefreshUrl("http://localhost")
                                                                                 .setReturnUrl("http://localhost")
                                                                                 .setType(AccountLinkCreateParams.Type.ACCOUNT_ONBOARDING)
                                                                                 .build();
        AccountLink accountLink = AccountLink.create(accountLinkCreateParams);

        //        TransferCreateParams transferParams = TransferCreateParams.builder()
        //                                                                  .setAmount(100L)
        //                                                                  .setCurrency("BGN")
        //                                                                  .setDestination("acct_1IIA7BHB8DfM9K3Z")
        //                                                                  .build();
        //        Transfer transfer = Transfer.create(transferParams);

        return account.getId();

        //        ChargeCreateParams chargeParams = ChargeCreateParams.builder()
        //                                                            .setAmount(request.getAmount())
        //                                                            .setCurrency("USD")
        //                                                            .setSource(request.getToken().getId())
        //                                                            .build();
        //        Charge charge = Charge.create(chargeParams);
        //        return charge.getId();
    }
}
