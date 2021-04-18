package com.sscatalog.specialistsservicescatalog.dtos;

import javax.validation.constraints.NotNull;

public class BecomeSpecialistRequest {

    private long locationId;

    @NotNull
    private String returnUrl;

    @NotNull
    private String refreshUrl;

    public long getLocationId() {
        return locationId;
    }

    public String getReturnUrl() {
        return returnUrl;
    }

    public String getRefreshUrl() {
        return refreshUrl;
    }
}
