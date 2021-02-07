package com.sscatalog.specialistsservicescatalog.dtos;

import javax.validation.constraints.NotNull;

public class BecomeSpecialistRequest {

    @NotNull
    private String returnUrl;

    @NotNull
    private String refreshUrl;

    public String getReturnUrl() {
        return returnUrl;
    }

    public String getRefreshUrl() {
        return refreshUrl;
    }
}
