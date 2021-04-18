package com.sscatalog.specialistsservicescatalog.dtos;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class CommentServiceRequestRequest {

    @NotBlank
    private String comment;

    public String getComment() {
        return comment;
    }
}
