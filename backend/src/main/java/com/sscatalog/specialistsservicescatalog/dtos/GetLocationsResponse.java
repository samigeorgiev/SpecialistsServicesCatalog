package com.sscatalog.specialistsservicescatalog.dtos;

import java.util.List;

public class GetLocationsResponse {

    private final List<LocationDto> locations;

    public GetLocationsResponse(List<LocationDto> locations) {
        this.locations = locations;
    }

    public List<LocationDto> getLocations() {
        return locations;
    }
}
