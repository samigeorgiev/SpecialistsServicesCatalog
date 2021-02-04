package com.sscatalog.specialistsservicescatalog.controllers;

import com.sscatalog.specialistsservicescatalog.dtos.GetServicesResponse;
import com.sscatalog.specialistsservicescatalog.dtos.ServiceDto;
import com.sscatalog.specialistsservicescatalog.services.ServicesService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/services")
public class ServicesController {

    private final ServicesService servicesService;

    public ServicesController(ServicesService servicesService) {this.servicesService = servicesService;}

    @GetMapping
    public GetServicesResponse getServices() {
        List<ServiceDto> services = servicesService.getServices();
        return new GetServicesResponse(services);
    }
}
