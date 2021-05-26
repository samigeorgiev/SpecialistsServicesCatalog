package com.sscatalog.specialistsservicescatalog.dtos;

import javax.validation.constraints.Min;

public class AddOfferedServiceRequest {

    private long serviceId;

    @Min(0)
    private double price;

    private boolean prepaid;

    public long getServiceId() {
        return serviceId;
    }

    public double getPrice() {
        return price;
    }

    public boolean isPrepaid() {
        return prepaid;
    }
}
