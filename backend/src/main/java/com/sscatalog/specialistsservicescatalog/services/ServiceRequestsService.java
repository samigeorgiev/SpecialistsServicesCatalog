package com.sscatalog.specialistsservicescatalog.services;

import com.sscatalog.specialistsservicescatalog.dtos.MakeServiceRequestRequest;
import com.sscatalog.specialistsservicescatalog.entities.*;
import com.sscatalog.specialistsservicescatalog.exceptions.ApiException;
import com.sscatalog.specialistsservicescatalog.repositories.OfferedServiceRepository;
import com.sscatalog.specialistsservicescatalog.repositories.ServiceRequestRepository;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class ServiceRequestsService {

    private final OfferedServiceRepository offeredServiceRepository;

    private final ServiceRequestRepository serviceRequestRepository;

    public ServiceRequestsService(OfferedServiceRepository offeredServiceRepository,
                                  ServiceRequestRepository serviceRequestRepository) {
        this.offeredServiceRepository = offeredServiceRepository;
        this.serviceRequestRepository = serviceRequestRepository;
    }

    public void makeServiceRequest(User user, MakeServiceRequestRequest request) {
        OfferedService requestedService = offeredServiceRepository.findById(request.getRequestedServiceId())
                                                                  .orElseThrow(() -> new ApiException(
                                                                          "Offered service does not exist"));
        Specialist requestedServiceSpecialist = requestedService.getSpecialist();
        if (Objects.equals(requestedServiceSpecialist.getUser(), user)) {
            throw new ApiException("Requestor is the same as the requested service specialist");
        }
        ServiceRequest serviceRequest = new ServiceRequest(ServiceRequestStatus.PENDING, false, user, requestedService);
        serviceRequestRepository.save(serviceRequest);
    }
}
