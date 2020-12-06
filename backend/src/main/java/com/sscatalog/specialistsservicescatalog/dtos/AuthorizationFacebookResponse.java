package com.sscatalog.specialistsservicescatalog.dtos;

public class AuthorizationFacebookResponse {

    private final String token;

    private final int expiresIn;

    public AuthorizationFacebookResponse(String token, int expiresIn) {
        this.token = token;
        this.expiresIn = expiresIn;
    }

    public String getToken() {
        return token;
    }

    public int getExpiresIn() {
        return expiresIn;
    }
}
