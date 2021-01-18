package com.sscatalog.specialistsservicescatalog.services;

import com.sscatalog.specialistsservicescatalog.dtos.OfferedServiceDto;
import com.sscatalog.specialistsservicescatalog.dtos.ServiceDto;
import com.sscatalog.specialistsservicescatalog.entities.Service;
import com.sscatalog.specialistsservicescatalog.exceptions.ApiException;
import com.sscatalog.specialistsservicescatalog.repositories.ServiceRepository;
import com.sscatalog.specialistsservicescatalog.utils.DtoConverter;

import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class ServicesService {

    private final ServiceRepository serviceRepository;

    public ServicesService(ServiceRepository serviceRepository) {this.serviceRepository = serviceRepository;}

    public List<ServiceDto> getServices() {
        return serviceRepository.findAll()
                                .stream()
                                .map(DtoConverter::toServiceDto)
                                .collect(Collectors.toList());
    }

    public List<OfferedServiceDto> getOfferedServices(long serviceId) {
        Service service = serviceRepository.findById(serviceId)
                                           .orElseThrow(() -> new ApiException("Invalid service id"));
        return service.getOfferedServices()
                      .stream()
                      .map(DtoConverter::toOfferedServiceDto)
                      .collect(Collectors.toList());
    }
}
