package com.sscatalog.specialistsservicescatalog.controllers;

import com.sscatalog.specialistsservicescatalog.dtos.AddOfferedServiceRequest;
import com.sscatalog.specialistsservicescatalog.dtos.IsSpecialistResponse;
import com.sscatalog.specialistsservicescatalog.dtos.OfferedServiceDto;
import com.sscatalog.specialistsservicescatalog.entities.User;
import com.sscatalog.specialistsservicescatalog.exceptions.ApiException;
import com.sscatalog.specialistsservicescatalog.services.SpecialistsService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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

    @GetMapping("/is-specialist")
    public IsSpecialistResponse isSpecialist(@AuthenticationPrincipal User user) {
        boolean isSpecialist = user.getSpecialist() != null;
        return new IsSpecialistResponse(isSpecialist);
    }

    @GetMapping("/services")
    public List<OfferedServiceDto> getOfferedServices(@AuthenticationPrincipal User user) {
        if (user.getSpecialist() == null) {
            throw new ApiException("User is not a specialist");
        }
        return specialistsService.getOfferedServices(user.getSpecialist()
                                                         .getId());
    }

    @PostMapping("/services")
    public void addService(@AuthenticationPrincipal User user,
                           @Valid @RequestBody AddOfferedServiceRequest request) {
        if (user.getSpecialist() == null) {
            throw new ApiException("User is not a specialist");
        }
        specialistsService.addService(user.getSpecialist(), request);
    }
}
