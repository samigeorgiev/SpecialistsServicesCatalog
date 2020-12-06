package com.sscatalog.specialistsservicescatalog.controllers;

import com.sscatalog.specialistsservicescatalog.dtos.AuthenticationFacebookRequest;
import com.sscatalog.specialistsservicescatalog.dtos.AuthenticationFacebookResponse;
import com.sscatalog.specialistsservicescatalog.exceptions.Guard;
import com.sscatalog.specialistsservicescatalog.services.AuthenticationService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/authentication")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/facebook")
    public AuthenticationFacebookResponse authenticateWithFacebook(@RequestBody AuthenticationFacebookRequest request) {
        Guard.againstNull(request.getCode(), "Code is missing");
        Guard.againstNull(request.getRedirectUri(), "Redirect Uri is missing");
        return authenticationService.authenticateWithFacebook(request.getCode(), request.getRedirectUri());
    }
}
