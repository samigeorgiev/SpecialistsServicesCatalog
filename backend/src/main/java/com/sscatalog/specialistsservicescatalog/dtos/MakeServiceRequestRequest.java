package com.sscatalog.specialistsservicescatalog.dtos;

import javax.validation.constraints.Min;

public class MakeServiceRequestRequest {

    @Min(1)
    private long requestedServiceId;

    public long getRequestedServiceId() {
        return requestedServiceId;
    }
}
