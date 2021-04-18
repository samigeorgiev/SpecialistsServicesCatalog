package com.sscatalog.specialistsservicescatalog.controllers;

import com.sscatalog.specialistsservicescatalog.dtos.GetLocationsResponse;
import com.sscatalog.specialistsservicescatalog.dtos.LocationDto;
import com.sscatalog.specialistsservicescatalog.services.LocationsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/locations")
public class LocationsController {

    private LocationsService locationsService;

    public LocationsController(LocationsService locationsService) {
        this.locationsService = locationsService;
    }

    @GetMapping
    public GetLocationsResponse getLocations() {
        List<LocationDto> locations = this.locationsService.getLocations();
        return new GetLocationsResponse(locations);
    }
}
