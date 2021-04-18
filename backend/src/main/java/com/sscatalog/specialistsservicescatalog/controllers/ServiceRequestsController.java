package com.sscatalog.specialistsservicescatalog.controllers;

import com.sscatalog.specialistsservicescatalog.dtos.*;
import com.sscatalog.specialistsservicescatalog.entities.User;
import com.sscatalog.specialistsservicescatalog.services.ServiceRequestsService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/service-requests")
@PreAuthorize("isAuthenticated()")
public class ServiceRequestsController {

    private final ServiceRequestsService serviceRequestsService;

    public ServiceRequestsController(ServiceRequestsService serviceRequestsService) {
        this.serviceRequestsService = serviceRequestsService;
    }

    @GetMapping("/{serviceRequestId}")
    @PreAuthorize("permitAll()")
    public GetServiceRequestResponse getServiceRequest(@PathVariable long serviceRequestId) {
        ServiceRequestDto serviceRequest = serviceRequestsService.getServiceRequest(serviceRequestId);
        return new GetServiceRequestResponse(serviceRequest);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void makeServiceRequest(@AuthenticationPrincipal User user,
                                   @Valid @RequestBody MakeServiceRequestRequest request) {
        serviceRequestsService.makeServiceRequest(user, request);
    }

    @PutMapping("/{serviceRequestId}/accept")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void acceptServiceRequest(@AuthenticationPrincipal User user, @PathVariable long serviceRequestId) {
        serviceRequestsService.acceptServiceRequest(user, serviceRequestId);
    }

    @PutMapping("/{serviceRequestId}/finish")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void finishServiceRequest(@AuthenticationPrincipal User user, @PathVariable long serviceRequestId) {
        serviceRequestsService.finishServiceRequest(user, serviceRequestId);
    }

    @PutMapping("/{serviceRequestId}/comment")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void commentServiceRequest(@AuthenticationPrincipal User user,
                                      @PathVariable long serviceRequestId,
                                      @Valid @RequestBody CommentServiceRequestRequest request) {
        serviceRequestsService.commentServiceRequest(user, serviceRequestId, request);
    }

    @PutMapping("/{serviceRequestId}/rate")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void rateServiceRequest(@AuthenticationPrincipal User user,
                                   @PathVariable long serviceRequestId,
                                   @Valid @RequestBody RateServiceRequestRequest request) {
        serviceRequestsService.rateServiceRequest(user, serviceRequestId, request);
    }
}