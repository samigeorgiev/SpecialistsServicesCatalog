package com.sscatalog.specialistsservicescatalog.dtos;

public class GetServiceRequestResponse {

    private final ServiceRequestDto serviceRequest;

    public GetServiceRequestResponse(ServiceRequestDto serviceRequest) {
        this.serviceRequest = serviceRequest;
    }

    public ServiceRequestDto getServiceRequest() {
        return serviceRequest;
    }
}
