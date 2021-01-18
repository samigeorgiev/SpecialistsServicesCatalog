package com.sscatalog.specialistsservicescatalog.dtos;

import java.util.List;

public class GetTagsResponse {

    private final List<TagDto> tags;

    public GetTagsResponse(List<TagDto> tags) {
        this.tags = tags;
    }

    public List<TagDto> getTags() {
        return tags;
    }
}
