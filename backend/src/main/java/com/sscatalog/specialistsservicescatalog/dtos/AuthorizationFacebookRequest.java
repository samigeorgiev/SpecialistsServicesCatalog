package com.sscatalog.specialistsservicescatalog.dtos;

import javax.validation.constraints.NotNull;

public class AuthorizationFacebookRequest {

    @NotNull
    private String code;

    @NotNull
    private String redirectUri;

    public String getCode() {
        return code;
    }

    public String getRedirectUri() {
        return redirectUri;
    }
}
