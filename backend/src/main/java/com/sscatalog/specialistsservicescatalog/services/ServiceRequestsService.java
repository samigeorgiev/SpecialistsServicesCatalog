package com.sscatalog.specialistsservicescatalog.services;

import com.sscatalog.specialistsservicescatalog.dtos.MakeServiceRequestRequest;
import com.sscatalog.specialistsservicescatalog.entities.OfferedService;
import com.sscatalog.specialistsservicescatalog.entities.ServiceRequest;
import com.sscatalog.specialistsservicescatalog.entities.ServiceRequestStatus;
import com.sscatalog.specialistsservicescatalog.entities.User;
import com.sscatalog.specialistsservicescatalog.exceptions.ApiException;
import com.sscatalog.specialistsservicescatalog.repositories.OfferedServiceRepository;
import com.sscatalog.specialistsservicescatalog.repositories.ServiceRequestRepository;
import org.springframework.stereotype.Service;

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
                                                                          "Offered service does not exists"));
        ServiceRequest serviceRequest = new ServiceRequest(ServiceRequestStatus.PENDING, false, user, requestedService);
        serviceRequestRepository.save(serviceRequest);
    }
}
