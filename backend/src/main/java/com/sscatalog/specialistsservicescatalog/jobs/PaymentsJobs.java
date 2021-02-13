package com.sscatalog.specialistsservicescatalog.jobs;

import com.sscatalog.specialistsservicescatalog.entities.ServiceRequest;
import com.sscatalog.specialistsservicescatalog.repositories.ServiceRequestRepository;
import com.sscatalog.specialistsservicescatalog.utils.PaymentsUtils;
import com.stripe.exception.StripeException;
import com.stripe.model.Transfer;
import com.stripe.param.TransferCreateParams;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class PaymentsJobs {

    private final ServiceRequestRepository serviceRequestRepository;

    public PaymentsJobs(ServiceRequestRepository serviceRequestRepository) {
        this.serviceRequestRepository = serviceRequestRepository;
    }

    @Scheduled(cron = "0 0 0 ? * *")
    public void specialistsPayouts() {
        LocalDateTime timestamp = LocalDateTime.now()
                                               .minusDays(7);
        serviceRequestRepository.findAllByPayTimestampBeforeAndPaidTrue(timestamp)
                                .forEach(this::transferFundsForServiceRequest);
    }

    private void transferFundsForServiceRequest(ServiceRequest serviceRequest) {
        long amount = PaymentsUtils.convertToStripePrice(serviceRequest.getRequestedService()
                                                                       .getPrice());
        String specialistStripeAccount = serviceRequest.getRequestedService()
                                                       .getSpecialist()
                                                       .getStripeAccountId();
        TransferCreateParams transferParams = TransferCreateParams.builder()
                                                                  .setAmount(amount)
                                                                  .setCurrency("USD")
                                                                  .setDestination(specialistStripeAccount)
                                                                  .build();
        try {
            Transfer.create(transferParams);
        } catch (StripeException exception) {
            exception.printStackTrace();
        }
    }
}
