package com.sscatalog.specialistsservicescatalog.controllers;

import com.sscatalog.specialistsservicescatalog.dtos.GetServiceRequestsResponse;
import com.sscatalog.specialistsservicescatalog.dtos.ServiceRequestDto;
import com.sscatalog.specialistsservicescatalog.entities.ServiceRequestStatus;
import com.sscatalog.specialistsservicescatalog.entities.User;
import com.sscatalog.specialistsservicescatalog.services.UsersService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@PreAuthorize("isAuthenticated()")
public class UsersController {

    private final UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping("/service-requests")
    public GetServiceRequestsResponse getServiceRequests(@AuthenticationPrincipal User user,
                                                         @RequestParam Optional<ServiceRequestStatus> serviceStatus,
                                                         @RequestParam Optional<Boolean> paid) {
        List<ServiceRequestDto> serviceRequests = usersService.getServiceRequests(user, serviceStatus, paid);
        return new GetServiceRequestsResponse(serviceRequests);
    }
}
