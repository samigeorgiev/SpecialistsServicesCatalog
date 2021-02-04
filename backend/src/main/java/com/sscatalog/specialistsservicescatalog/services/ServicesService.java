package com.sscatalog.specialistsservicescatalog.services;

import com.sscatalog.specialistsservicescatalog.dtos.ServiceDto;
import com.sscatalog.specialistsservicescatalog.entities.Service;
import com.sscatalog.specialistsservicescatalog.repositories.ServiceRepository;

import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class ServicesService {

    private final ServiceRepository serviceRepository;

    public ServicesService(ServiceRepository serviceRepository) {this.serviceRepository = serviceRepository;}

    public List<ServiceDto> getServices() {
        return serviceRepository.findAll()
                                .stream()
                                .map(this::buildServiceDto)
                                .collect(Collectors.toList());
    }

    private ServiceDto buildServiceDto(Service service) {
        return new ServiceDto(service.getId(),
                              service.getName(),
                              service.getTag()
                                     .getName());
    }
}
