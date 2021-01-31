package com.sscatalog.specialistsservicescatalog.controllers;

import com.sscatalog.specialistsservicescatalog.dtos.MakeServiceRequestRequest;
import com.sscatalog.specialistsservicescatalog.entities.User;
import com.sscatalog.specialistsservicescatalog.services.ServiceRequestsService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("service-requests")
@PreAuthorize("isAuthenticated()")
public class ServiceRequestsController {

    private final ServiceRequestsService serviceRequestsService;

    public ServiceRequestsController(ServiceRequestsService serviceRequestsService) {
        this.serviceRequestsService = serviceRequestsService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void makeServiceRequest(@AuthenticationPrincipal User user,
                                   @Valid @RequestBody MakeServiceRequestRequest request) {
        serviceRequestsService.makeServiceRequest(user, request);
    }
}
