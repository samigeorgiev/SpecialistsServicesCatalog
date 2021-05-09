package com.sscatalog.specialistsservicescatalog.services;

import com.sscatalog.specialistsservicescatalog.dtos.AddOfferedServiceRequest;
import com.sscatalog.specialistsservicescatalog.dtos.BecomeSpecialistRequest;
import com.sscatalog.specialistsservicescatalog.dtos.OfferedServiceDto;
import com.sscatalog.specialistsservicescatalog.dtos.ServiceRequestDto;
import com.sscatalog.specialistsservicescatalog.entities.*;
import com.sscatalog.specialistsservicescatalog.exceptions.ApiException;
import com.sscatalog.specialistsservicescatalog.repositories.*;
import com.sscatalog.specialistsservicescatalog.utils.DtoConverter;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;
import com.stripe.model.AccountLink;
import com.stripe.param.AccountCreateParams;
import com.stripe.param.AccountLinkCreateParams;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class SpecialistsService {

    private final SpecialistRepository specialistRepository;

    private final OfferedServiceRepository offeredServiceRepository;

    private final ServiceRepository serviceRepository;

    private final ServiceRequestRepository serviceRequestRepository;

    private final LocationRepository locationRepository;

    public SpecialistsService(SpecialistRepository specialistRepository,
                              OfferedServiceRepository offeredServiceRepository,
                              ServiceRepository serviceRepository,
                              ServiceRequestRepository serviceRequestRepository,
                              LocationRepository locationRepository) {
        this.specialistRepository = specialistRepository;
        this.offeredServiceRepository = offeredServiceRepository;
        this.serviceRepository = serviceRepository;
        this.serviceRequestRepository = serviceRequestRepository;
        this.locationRepository = locationRepository;
    }

    public String becomeSpecialist(User user, BecomeSpecialistRequest request) {
        Account account;
        AccountLink accountLink;
        try {
            account = createStripeAccount();
            accountLink = generateAccountLink(account, request.getRefreshUrl(), request.getReturnUrl());
        } catch (StripeException exception) {
            throw new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, "Creating Stripe account failed", exception);
        }

        Specialist specialist = new Specialist(account.getId());
        specialist.setUser(user);
        Location location = locationRepository.findById(request.getLocationId())
                                              .orElseThrow(() -> new ApiException("Location not found"));
        specialist.setLocation(location);
        specialistRepository.save(specialist);

        return accountLink.getUrl();
    }

    private Account createStripeAccount() throws StripeException {
        AccountCreateParams.Capabilities accountCapabilities = AccountCreateParams.Capabilities.builder()
                                                                                               .build();
        AccountCreateParams accountCreateParams = AccountCreateParams.builder()
                                                                     .setType(AccountCreateParams.Type.STANDARD)
                                                                     .setCapabilities(accountCapabilities)
                                                                     .build();
        return Account.create(accountCreateParams);
    }

    private AccountLink generateAccountLink(Account account, String refreshUrl, String returnUrl) throws
                                                                                                  StripeException {
        AccountLinkCreateParams.Type accountLinkType = AccountLinkCreateParams.Type.ACCOUNT_ONBOARDING;
        AccountLinkCreateParams accountLinkCreateParams = AccountLinkCreateParams.builder()
                                                                                 .setAccount(account.getId())
                                                                                 .setRefreshUrl(refreshUrl)
                                                                                 .setReturnUrl(returnUrl)
                                                                                 .setType(accountLinkType)
                                                                                 .build();
        return AccountLink.create(accountLinkCreateParams);
    }

    public List<OfferedServiceDto> getOfferedServices(long specialistId) {
        List<OfferedService> offeredServices = offeredServiceRepository.findAllBySpecialistIdIncludingService(
                specialistId);
        return offeredServices.stream()
                              .map(DtoConverter::toOfferedServiceDto)
                              .collect(Collectors.toList());
    }

    public void addService(Specialist specialist, AddOfferedServiceRequest request) {
        if (offeredServiceExists(specialist, request.getServiceId())) {
            throw new ApiException("Service already exists");
        }
        Service service = serviceRepository.findById(request.getServiceId())
                                           .orElseThrow(() -> new ApiException("Service not found"));
        OfferedService offeredService = new OfferedService(request.getPrice(), request.isPrepaid());
        offeredService.setService(service);
        offeredService.setSpecialist(specialist);
        offeredServiceRepository.save(offeredService);
    }

    private boolean offeredServiceExists(Specialist specialist, long serviceId) {
        return offeredServiceRepository.findAllBySpecialistIdIncludingService(specialist.getId())
                                       .stream()
                                       .map(OfferedService::getService)
                                       .anyMatch(service -> service.getId() == serviceId);
    }

    public List<ServiceRequestDto> getServiceRequests(Specialist specialist,
                                                      Optional<ServiceRequestStatus> serviceStatus,
                                                      Optional<Boolean> paid) {
        return serviceRequestRepository.findAllBySpecialistAndStatus(specialist,
                                                                     serviceStatus.orElse(null),
                                                                     paid.orElse(null))
                                       .stream()
                                       .map(DtoConverter::toServiceRequestDto)
                                       .collect(Collectors.toList());
    }
}
