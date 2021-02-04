package com.sscatalog.specialistsservicescatalog.dtos;

import java.util.List;

public class GetServicesResponse {

    private final List<ServiceDto> services;

    public GetServicesResponse(List<ServiceDto> services) {this.services = services;}

    public List<ServiceDto> getServices() {
        return services;
    }
}
