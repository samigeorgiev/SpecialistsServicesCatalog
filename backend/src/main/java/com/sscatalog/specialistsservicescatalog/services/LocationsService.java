package com.sscatalog.specialistsservicescatalog.services;

import com.sscatalog.specialistsservicescatalog.dtos.LocationDto;
import com.sscatalog.specialistsservicescatalog.repositories.LocationRepository;
import com.sscatalog.specialistsservicescatalog.utils.DtoConverter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LocationsService {

    private final LocationRepository locationRepository;

    public LocationsService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public List<LocationDto> getLocations() {
        return this.locationRepository.findAll()
                                      .stream()
                                      .map(DtoConverter::toLocationDto)
                                      .collect(Collectors.toList());
    }
}
