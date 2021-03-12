package com.sscatalog.specialistsservicescatalog.services;

import com.sscatalog.specialistsservicescatalog.dtos.OfferedServiceDto;
import com.sscatalog.specialistsservicescatalog.dtos.ServiceDto;
import com.sscatalog.specialistsservicescatalog.entities.Service;
import com.sscatalog.specialistsservicescatalog.exceptions.ApiException;
import com.sscatalog.specialistsservicescatalog.repositories.OfferedServiceRepository;
import com.sscatalog.specialistsservicescatalog.repositories.ServiceRepository;
import com.sscatalog.specialistsservicescatalog.utils.DtoConverter;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class ServicesService {

    private final ServiceRepository serviceRepository;

    private final OfferedServiceRepository offeredServiceRepository;

    public ServicesService(ServiceRepository serviceRepository, OfferedServiceRepository offeredServiceRepository) {
        this.serviceRepository = serviceRepository;
        this.offeredServiceRepository = offeredServiceRepository;
    }

    public List<ServiceDto> getServices() {
        return serviceRepository.findAll()
                                .stream()
                                .map(DtoConverter::toServiceDto)
                                .collect(Collectors.toList());
    }

    public List<OfferedServiceDto> getOfferedServices(long serviceId,
                                                      Optional<Long> locationId,
                                                      Optional<Double> minimumRating,
                                                      Optional<Double> maximumPrice) {
        Service service = serviceRepository.findById(serviceId)
                                           .orElseThrow(() -> new ApiException("Invalid service id"));
        this.offeredServiceRepository.findAllByServiceAndSpecialistLocationAndMinimumRatingAndMinumumPrice(service,
                                                                                                           locationId.orElse(
                                                                                                                   null),
                                                                                                           minimumRating.orElse(
                                                                                                                   null),
                                                                                                           maximumPrice.orElse(
                                                                                                                   null));
        return service.getOfferedServices()
                      .stream()
                      .map(DtoConverter::toOfferedServiceDto)
                      .collect(Collectors.toList());
    }
}
