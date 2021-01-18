package com.sscatalog.specialistsservicescatalog.dtos;

public class SpecialistDto {

    private final long id;

    private final String name;

    public SpecialistDto(long id, String name) {
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
