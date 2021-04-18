package com.sscatalog.specialistsservicescatalog.controllers;

import com.sscatalog.specialistsservicescatalog.dtos.GetOfferedServicesResponse;
import com.sscatalog.specialistsservicescatalog.dtos.GetServicesResponse;
import com.sscatalog.specialistsservicescatalog.dtos.OfferedServiceDto;
import com.sscatalog.specialistsservicescatalog.dtos.ServiceDto;
import com.sscatalog.specialistsservicescatalog.services.ServicesService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @GetMapping("/{serviceId}/offered-services")
    public GetOfferedServicesResponse getOfferedServices(@PathVariable long serviceId,
                                                         @RequestParam Optional<Long> locationId,
                                                         @RequestParam Optional<Double> minimumRating,
                                                         @RequestParam Optional<Double> maximumPrice) {

        List<OfferedServiceDto> offeredServices = servicesService.getOfferedServices(serviceId,
                                                                                     locationId,
                                                                                     minimumRating,
                                                                                     maximumPrice);
        return new GetOfferedServicesResponse(offeredServices);
    }
}
