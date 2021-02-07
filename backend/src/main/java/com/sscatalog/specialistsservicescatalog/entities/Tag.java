package com.sscatalog.specialistsservicescatalog.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name = "tags")
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "name")
    @NotNull
    private String name;

    @ManyToOne
    @JoinColumn(name = "parent_tag_id")
    private Tag parentTag;

    @OneToMany(mappedBy = "parentTag")
    private List<Tag> childrenTags;

    protected Tag() {
    }

    public Tag(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Tag getParentTag() {
        return parentTag;
    }

    public void setParentTag(Tag parentTag) {
        this.parentTag = parentTag;
    }

    public List<Tag> getChildrenTags() {
        return childrenTags;
    }

    public void setChildrenTags(List<Tag> childrenTags) {
        this.childrenTags = childrenTags;
    }
}
