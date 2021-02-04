package com.sscatalog.specialistsservicescatalog.repositories;

import com.sscatalog.specialistsservicescatalog.entities.OfferedService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OfferedServiceRepository extends JpaRepository<OfferedService, Long> {

    @Query(
            "select offeredService " +
            "from OfferedService offeredService " +
            "join fetch offeredService.service " +
            "where offeredService.specialist.id = :specialistId"
    )
    List<OfferedService> findAllBySpecialistIdIncludingService(long specialistId);
}
