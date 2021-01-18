package com.sscatalog.specialistsservicescatalog.dtos;

public class ServiceDto {

    private final long id;

    private final String name;

    private final long tagId;

    private final String tag;

    public ServiceDto(long id, String name, long tagId, String tag) {
        this.id = id;
        this.name = name;
        this.tagId = tagId;
        this.tag = tag;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public long getTagId() {
        return tagId;
    }

    public String getTag() {
        return tag;
    }
}
