package com.sscatalog.specialistsservicescatalog.dtos;

public class LocationDto {

    private long id;

    private String name;

    public LocationDto(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
