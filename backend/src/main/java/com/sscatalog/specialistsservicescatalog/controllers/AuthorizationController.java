package com.sscatalog.specialistsservicescatalog.controllers;

import com.sscatalog.specialistsservicescatalog.dtos.AuthorizationFacebookRequest;
import com.sscatalog.specialistsservicescatalog.dtos.AuthorizationFacebookResponse;
import com.sscatalog.specialistsservicescatalog.services.AuthorizationService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/authorization")
public class AuthorizationController {

    private final AuthorizationService authorizationService;

    public AuthorizationController(AuthorizationService authorizationService) {
        this.authorizationService = authorizationService;
    }

    @PostMapping("/facebook")
    public AuthorizationFacebookResponse authorizeWithFacebook(@Valid @RequestBody AuthorizationFacebookRequest request) {
        return authorizationService.authorizeWithFacebook(request.getCode(), request.getRedirectUri());
    }
}
