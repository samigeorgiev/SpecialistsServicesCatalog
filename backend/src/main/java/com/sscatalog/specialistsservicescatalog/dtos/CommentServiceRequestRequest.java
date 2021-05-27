package com.sscatalog.specialistsservicescatalog.dtos;

import javax.validation.constraints.NotBlank;

public class CommentServiceRequestRequest {

    @NotBlank
    private String comment;

    public String getComment() {
        return comment;
    }
}
