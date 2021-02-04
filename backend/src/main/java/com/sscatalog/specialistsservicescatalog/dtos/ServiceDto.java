package com.sscatalog.specialistsservicescatalog.dtos;

public class ServiceDto {

    private final long id;

    private final String name;

    private final String tag;

    public ServiceDto(long id, String name, String tag) {
        this.id = id;
        this.name = name;
        this.tag = tag;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getTag() {
        return tag;
    }
}
