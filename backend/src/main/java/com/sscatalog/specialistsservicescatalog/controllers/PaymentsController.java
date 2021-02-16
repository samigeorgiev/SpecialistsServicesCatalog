package com.sscatalog.specialistsservicescatalog.controllers;

import com.sscatalog.specialistsservicescatalog.dtos.MakeStripePaymentRequest;
import com.sscatalog.specialistsservicescatalog.services.PaymentsService;
import com.stripe.exception.StripeException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/payments")
@PreAuthorize("isAuthenticated()")
public class PaymentsController {

    private final PaymentsService paymentsService;

    public PaymentsController(PaymentsService paymentsService) {
        this.paymentsService = paymentsService;
    }

    @PostMapping("/stripe")
    public void makeStripePayments(@Valid @RequestBody MakeStripePaymentRequest request) {
        paymentsService.makeStripePayment(request);
    }
}
