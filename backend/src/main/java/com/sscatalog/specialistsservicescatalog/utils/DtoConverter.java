package com.sscatalog.specialistsservicescatalog.utils;

import com.sscatalog.specialistsservicescatalog.dtos.OfferedServiceDto;
import com.sscatalog.specialistsservicescatalog.dtos.ServiceDto;
import com.sscatalog.specialistsservicescatalog.dtos.SpecialistDto;
import com.sscatalog.specialistsservicescatalog.entities.*;

public class DtoConverter {

    public static OfferedServiceDto toOfferedServiceDto(OfferedService entity) {
        Service service = entity.getService();
        Specialist specialist = entity.getSpecialist();
        return new OfferedServiceDto(toSpecialistDto(specialist),
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
}
