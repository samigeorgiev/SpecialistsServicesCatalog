package com.sscatalog.specialistsservicescatalog.dtos;

import java.util.List;

public class GetOfferedServicesResponse {

    private final List<OfferedServiceDto> offeredServices;

    public GetOfferedServicesResponse(List<OfferedServiceDto> offeredServices) {
        this.offeredServices = offeredServices;
    }

    public List<OfferedServiceDto> getOfferedServices() {
        return offeredServices;
    }
}
