package com.sscatalog.specialistsservicescatalog.services;

import com.sscatalog.specialistsservicescatalog.dtos.CommentServiceRequestRequest;
import com.sscatalog.specialistsservicescatalog.dtos.MakeServiceRequestRequest;
import com.sscatalog.specialistsservicescatalog.dtos.RateServiceRequestRequest;
import com.sscatalog.specialistsservicescatalog.dtos.ServiceRequestDto;
import com.sscatalog.specialistsservicescatalog.entities.*;
import com.sscatalog.specialistsservicescatalog.exceptions.ApiException;
import com.sscatalog.specialistsservicescatalog.repositories.OfferedServiceRepository;
import com.sscatalog.specialistsservicescatalog.repositories.ServiceRequestRepository;
import com.sscatalog.specialistsservicescatalog.utils.DtoConverter;
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

    public void acceptServiceRequest(User user, long serviceRequestId) {
        updateServiceRequestStatus(user,
                                   serviceRequestId,
                                   ServiceRequestStatus.PENDING,
                                   ServiceRequestStatus.IN_PROGRESS);
    }

    public void finishServiceRequest(User user, long serviceRequestId) {
        updateServiceRequestStatus(user,
                                   serviceRequestId,
                                   ServiceRequestStatus.IN_PROGRESS,
                                   ServiceRequestStatus.FINISHED);
    }

    private void updateServiceRequestStatus(User user,
                                            long serviceRequestId,
                                            ServiceRequestStatus fromStatus,
                                            ServiceRequestStatus toStatus) {
        ServiceRequest serviceRequest = serviceRequestRepository.findById(serviceRequestId)
                                                                .orElseThrow(() -> new ApiException(
                                                                        "Service request does not exist"));
        User serviceRequestSpecialistUser = serviceRequest.getRequestedService()
                                                          .getSpecialist()
                                                          .getUser();
        if (!Objects.equals(serviceRequestSpecialistUser, user)) {
            throw new ApiException("Specialist is not offering this service");
        }
        if (serviceRequest.getStatus() != fromStatus) {
            throw new ApiException("Service request is not in " + fromStatus + " status");
        }
        serviceRequest.setStatus(toStatus);
        serviceRequestRepository.save(serviceRequest);
    }

    public void commentServiceRequest(User user, long serviceRequestId, CommentServiceRequestRequest request) {
        ServiceRequest serviceRequest = serviceRequestRepository.findById(serviceRequestId)
                                                                .orElseThrow(() -> new ApiException(
                                                                        "Service request does not exists"));
        if (!user.equals(serviceRequest.getRequestor())) {
            throw new ApiException("User is not the requestor of the service");
        }
        if (serviceRequest.getComment() != null) {
            throw new ApiException("Service request is already commented");
        }
        serviceRequest.setComment(request.getComment());
        serviceRequestRepository.save(serviceRequest);
    }

    public void rateServiceRequest(User user, long serviceRequestId, RateServiceRequestRequest request) {
        ServiceRequest serviceRequest = serviceRequestRepository.findById(serviceRequestId)
                                                                .orElseThrow(() -> new ApiException(
                                                                        "Service request does not exists"));
        if (!user.equals(serviceRequest.getRequestor())) {
            throw new ApiException("User is not the requestor of the service");
        }
        if (serviceRequest.getComment() != null) {
            throw new ApiException("Service request is already commented");
        }
        serviceRequest.setRating(request.getRating());
        serviceRequestRepository.save(serviceRequest);
    }

    public ServiceRequestDto getServiceRequest(long serviceRequestId) {
        return serviceRequestRepository.findById(serviceRequestId)
                                       .map(DtoConverter::toServiceRequestDto)
                                       .orElseThrow(() -> new ApiException("Service request not found"));
    }
}
