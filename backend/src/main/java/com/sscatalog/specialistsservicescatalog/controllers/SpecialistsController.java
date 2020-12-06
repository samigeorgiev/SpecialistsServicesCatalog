package com.sscatalog.specialistsservicescatalog.controllers;

import com.sscatalog.specialistsservicescatalog.entities.User;
import com.sscatalog.specialistsservicescatalog.exceptions.ApiException;
import com.sscatalog.specialistsservicescatalog.services.SpecialistsService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/specialists")
@PreAuthorize("isAuthenticated()")
public class SpecialistsController {

    private final SpecialistsService specialistsService;

    public SpecialistsController(SpecialistsService specialistsService) {
        this.specialistsService = specialistsService;
    }

    @PostMapping("/become-specialist")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void becomeSpecialist(@AuthenticationPrincipal User user) {
        if (user.getSpecialist() != null) {
            throw new ApiException("User is already a specialist");
        }
        specialistsService.becomeSpecialist(user);
    }
}
