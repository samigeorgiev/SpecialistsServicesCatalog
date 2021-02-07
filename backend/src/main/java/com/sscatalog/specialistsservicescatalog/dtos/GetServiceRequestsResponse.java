package com.sscatalog.specialistsservicescatalog.dtos;

import java.util.List;

public class GetServiceRequestsResponse {

    private final List<ServiceRequestDto> serviceRequests;

    public GetServiceRequestsResponse(List<ServiceRequestDto> serviceRequests) {
        this.serviceRequests = serviceRequests;
    }

    public List<ServiceRequestDto> getServiceRequests() {
        return serviceRequests;
    }
}
