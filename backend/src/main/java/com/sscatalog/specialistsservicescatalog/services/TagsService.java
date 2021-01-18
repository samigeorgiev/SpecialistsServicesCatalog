package com.sscatalog.specialistsservicescatalog.services;

import com.sscatalog.specialistsservicescatalog.dtos.TagDto;
import com.sscatalog.specialistsservicescatalog.entities.Tag;
import com.sscatalog.specialistsservicescatalog.repositories.TagRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
public class TagsService {

    private final TagRepository tagRepository;

    public TagsService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public List<TagDto> getTags() {
        Map<Long, TagDto> allTags = tagRepository.findAll()
                                                 .stream()
                                                 .collect(Collectors.toMap(Tag::getId, this::buildTagDto));
        allTags.values()
               .stream()
               .filter(tag -> !this.rootLevelTag(tag))
               .forEach(tag -> {
                   TagDto parentTag = allTags.get(tag.getParentTagId());
                   parentTag.getChildrenTags()
                            .add(tag);
               });

        return allTags.values()
                      .stream()
                      .filter(this::rootLevelTag)
                      .collect(Collectors.toList());
    }

    private TagDto buildTagDto(Tag tag) {
        Tag parentTag = tag.getParentTag();
        Long parentTagId = parentTag != null ? parentTag.getId() : null;
        return new TagDto(tag.getId(), tag.getName(), parentTagId, new ArrayList<>());
    }

    private boolean rootLevelTag(TagDto tag) {
        return tag.getParentTagId() == null;
    }
}
