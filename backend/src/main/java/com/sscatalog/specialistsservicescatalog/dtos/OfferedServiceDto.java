package com.sscatalog.specialistsservicescatalog.dtos;

public class OfferedServiceDto {

    private final ServiceDto service;

    private final double price;

    private final boolean isPrepaid;

    public OfferedServiceDto(ServiceDto service, double price, boolean isPrepaid) {
        this.service = service;
        this.price = price;
        this.isPrepaid = isPrepaid;
    }

    public ServiceDto getService() {
        return service;
    }

    public double getPrice() {
        return price;
    }

    public boolean isPrepaid() {
        return isPrepaid;
    }
}
