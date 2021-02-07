package com.sscatalog.specialistsservicescatalog.utils;

import com.sscatalog.specialistsservicescatalog.dtos.*;
import com.sscatalog.specialistsservicescatalog.entities.*;

import java.util.ArrayList;

public class DtoConverter {

    public static OfferedServiceDto toOfferedServiceDto(OfferedService entity) {
        Service service = entity.getService();
        Specialist specialist = entity.getSpecialist();
        return new OfferedServiceDto(entity.getId(),
                                     toSpecialistDto(specialist),
                                     toServiceDto(service),
                                     entity.getPrice(),
                                     entity.isPrepaid());
    }

    public static ServiceDto toServiceDto(Service entity) {
        Tag tag = entity.getTag();
        return new ServiceDto(entity.getId(), entity.getName(), tag.getId(), tag.getName());
    }

    public static SpecialistDto toSpecialistDto(Specialist entity) {
        User user = entity.getUser();
        return new SpecialistDto(entity.getId(), user.getName());
    }

    public static TagDto toTagDto(Tag entity) {
        Tag parentTag = entity.getParentTag();
        Long parentTagId = parentTag != null ? parentTag.getId() : null;
        return new TagDto(entity.getId(), entity.getName(), parentTagId, new ArrayList<>());
    }

    public static ServiceRequestDto toServiceRequestDto(ServiceRequest entity) {
        User requestor = entity.getRequestor();
        OfferedService requestedService = entity.getRequestedService();
        return new ServiceRequestDto(entity.getId(),
                                     entity.getStatus(),
                                     entity.isPaid(),
                                     entity.getRating(),
                                     entity.getComment(),
                                     requestor.getName(),
                                     toOfferedServiceDto(requestedService));
    }
}
