package com.sscatalog.specialistsservicescatalog.controllers;

import com.sscatalog.specialistsservicescatalog.dtos.GetTagsResponse;
import com.sscatalog.specialistsservicescatalog.dtos.TagDto;
import com.sscatalog.specialistsservicescatalog.services.TagsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/tags")
public class TagsController {

    private final TagsService tagsService;

    public TagsController(TagsService tagsService) {
        this.tagsService = tagsService;
    }

    @GetMapping
    public GetTagsResponse getTags() {
        List<TagDto> tags = tagsService.getTags();
        return new GetTagsResponse(tags);
    }
}
