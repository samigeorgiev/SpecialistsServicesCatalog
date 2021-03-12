package com.sscatalog.specialistsservicescatalog.services;

import com.sscatalog.specialistsservicescatalog.config.properties.PaymentsProperties;
import com.sscatalog.specialistsservicescatalog.dtos.MakeStripePaymentRequest;
import com.sscatalog.specialistsservicescatalog.entities.OfferedService;
import com.sscatalog.specialistsservicescatalog.entities.ServiceRequest;
import com.sscatalog.specialistsservicescatalog.entities.ServiceRequestStatus;
import com.sscatalog.specialistsservicescatalog.exceptions.ApiException;
import com.sscatalog.specialistsservicescatalog.repositories.ServiceRequestRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.param.ChargeCreateParams;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PaymentsService {

    private final ServiceRequestRepository serviceRequestRepository;

    public PaymentsService(ServiceRequestRepository serviceRequestRepository, PaymentsProperties paymentsProperties) {
        Stripe.apiKey = paymentsProperties.getStripeSecretKey();
        this.serviceRequestRepository = serviceRequestRepository;
    }

    public void makeStripePayment(MakeStripePaymentRequest request) {
        ServiceRequest serviceRequest = serviceRequestRepository.findById(request.getServiceRequestId())
                                                                .orElseThrow(() -> new ApiException(
                                                                        "Service request not found"));
        if (!isServiceRequestPayable(serviceRequest)) {
            throw new ApiException("Service request is not payable");
        }
        OfferedService requestedService = serviceRequest.getRequestedService();
        ChargeCreateParams chargeParams = ChargeCreateParams.builder()
                                                            .setAmount(toStripePrice(requestedService.getPrice()))
                                                            .setCurrency("USD")
                                                            .setSource(request.getToken()
                                                                              .getId())
                                                            .build();
        Charge charge;
        try {
            charge = Charge.create(chargeParams);
        } catch (StripeException exception) {
            throw new ApiException("Payment failed");
        }
        if (!charge.getPaid()) {
            throw new ApiException("Payment was not successful");
        }
        serviceRequest.setPaid(true);
        serviceRequest.setPayTimestamp(LocalDateTime.now());
        serviceRequestRepository.save(serviceRequest);
    }

    private boolean isServiceRequestPayable(ServiceRequest serviceRequest) {
        return !serviceRequest.isPaid() && serviceRequest.getStatus() == ServiceRequestStatus.FINISHED;
    }

    private long toStripePrice(double price) {
        return (long)(price * 100);
    }
}
