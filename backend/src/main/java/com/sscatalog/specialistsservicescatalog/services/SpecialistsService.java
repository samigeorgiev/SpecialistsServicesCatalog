package com.sscatalog.specialistsservicescatalog.services;

import com.sscatalog.specialistsservicescatalog.dtos.AddOfferedServiceRequest;
import com.sscatalog.specialistsservicescatalog.dtos.ServiceDto;
import com.sscatalog.specialistsservicescatalog.dtos.OfferedServiceDto;
import com.sscatalog.specialistsservicescatalog.entities.*;
import com.sscatalog.specialistsservicescatalog.exceptions.ApiException;
import com.sscatalog.specialistsservicescatalog.repositories.OfferedServiceRepository;
import com.sscatalog.specialistsservicescatalog.repositories.ServiceRepository;
import com.sscatalog.specialistsservicescatalog.repositories.SpecialistRepository;
import com.sscatalog.specialistsservicescatalog.utils.DtoConverter;

import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class SpecialistsService {

    private final SpecialistRepository specialistRepository;

    private final OfferedServiceRepository offeredServiceRepository;

    private final ServiceRepository serviceRepository;

    public SpecialistsService(SpecialistRepository specialistRepository,
                              OfferedServiceRepository offeredServiceRepository,
                              ServiceRepository serviceRepository) {
        this.specialistRepository = specialistRepository;
        this.offeredServiceRepository = offeredServiceRepository;
        this.serviceRepository = serviceRepository;
    }

    public void becomeSpecialist(User user) {
        Specialist specialist = new Specialist();
        specialist.setUser(user);

        specialistRepository.save(specialist);
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
}
