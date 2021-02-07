package com.sscatalog.specialistsservicescatalog.services;

import com.sscatalog.specialistsservicescatalog.dtos.ServiceRequestDto;
import com.sscatalog.specialistsservicescatalog.entities.ServiceRequestStatus;
import com.sscatalog.specialistsservicescatalog.entities.User;
import com.sscatalog.specialistsservicescatalog.repositories.ServiceRequestRepository;
import com.sscatalog.specialistsservicescatalog.utils.DtoConverter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsersService {

    private final ServiceRequestRepository serviceRequestRepository;

    public UsersService(ServiceRequestRepository serviceRequestRepository) {
        this.serviceRequestRepository = serviceRequestRepository;
    }

    public List<ServiceRequestDto> getServiceRequests(User user,
                                                      Optional<ServiceRequestStatus> serviceStatus,
                                                      Optional<Boolean> paid) {
        return serviceRequestRepository.findAllByRequestorAndStatusAndPaid(user,
                                                                           serviceStatus.orElse(null),
                                                                           paid.orElse(null))
                                       .stream()
                                       .map(DtoConverter::toServiceRequestDto)
                                       .collect(Collectors.toList());
    }
}
