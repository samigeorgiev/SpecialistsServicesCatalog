package com.sscatalog.specialistsservicescatalog.dtos;

import java.util.List;

public class TagDto {

    private final long id;

    private final String name;

    private final Long parentTagId;

    private final List<TagDto> childrenTags;

    public TagDto(long id, String name, Long parentTagId, List<TagDto> childrenTags) {
        this.id = id;
        this.name = name;
        this.parentTagId = parentTagId;
        this.childrenTags = childrenTags;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Long getParentTagId() {
        return parentTagId;
    }

    public List<TagDto> getChildrenTags() {
        return childrenTags;
    }
}
