package com.sscatalog.specialistsservicescatalog.controllers;

import com.sscatalog.specialistsservicescatalog.dtos.*;
import com.sscatalog.specialistsservicescatalog.entities.ServiceRequestStatus;
import com.sscatalog.specialistsservicescatalog.entities.Specialist;
import com.sscatalog.specialistsservicescatalog.entities.User;
import com.sscatalog.specialistsservicescatalog.exceptions.ApiException;
import com.sscatalog.specialistsservicescatalog.services.SpecialistsService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

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
        Specialist specialist = user.getSpecialist();
        if (specialist == null) {
            throw new ApiException("User is not a specialist");
        }
        return specialistsService.getOfferedServices(specialist.getId());
    }

    @PostMapping("/services")
    public void addService(@AuthenticationPrincipal User user, @Valid @RequestBody AddOfferedServiceRequest request) {
        Specialist specialist = user.getSpecialist();
        if (specialist == null) {
            throw new ApiException("User is not a specialist");
        }
        specialistsService.addService(specialist, request);
    }

    @GetMapping("/service-requests")
    public GetServiceRequestsResponse getServiceRequests(@AuthenticationPrincipal User user,
                                                         @RequestParam Optional<ServiceRequestStatus> serviceStatus,
                                                         @RequestParam Optional<Boolean> paid) {
        Specialist specialist = user.getSpecialist();
        if (specialist == null) {
            throw new ApiException("User is not a specialist");
        }
        List<ServiceRequestDto> serviceRequests = specialistsService.getServiceRequests(specialist, serviceStatus);
        return new GetServiceRequestsResponse(serviceRequests);
    }
}
