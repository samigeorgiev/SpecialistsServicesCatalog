package com.sscatalog.specialistsservicescatalog.dtos;

public class OfferedServiceDto {

    private final long id;

    private final SpecialistDto specialist;

    private final ServiceDto service;

    private final double price;

    private final boolean isPrepaid;

    public OfferedServiceDto(long id, SpecialistDto specialist, ServiceDto service, double price, boolean isPrepaid) {
        this.id = id;
        this.specialist = specialist;
        this.service = service;
        this.price = price;
        this.isPrepaid = isPrepaid;
    }

    public long getId() {
        return id;
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
