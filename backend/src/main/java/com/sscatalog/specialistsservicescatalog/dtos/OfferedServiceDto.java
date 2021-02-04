package com.sscatalog.specialistsservicescatalog.dtos;

public class OfferedServiceDto {

    private final SpecialistDto specialist;

    private final ServiceDto service;

    private final double price;

    private final boolean isPrepaid;

    public OfferedServiceDto(SpecialistDto specialist, ServiceDto service, double price, boolean isPrepaid) {
        this.specialist = specialist;
        this.service = service;
        this.price = price;
        this.isPrepaid = isPrepaid;
    }

    public SpecialistDto getSpecialist() {
        return specialist;
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
