package com.sscatalog.specialistsservicescatalog.repositories;

import com.sscatalog.specialistsservicescatalog.entities.OfferedService;
import com.sscatalog.specialistsservicescatalog.entities.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OfferedServiceRepository extends JpaRepository<OfferedService, Long> {

    @Query("""
           select offeredService
           from OfferedService offeredService
           join fetch offeredService.service
           where offeredService.specialist.id = :specialistId""")
    List<OfferedService> findAllBySpecialistIdIncludingService(long specialistId);

    @Query("""
           select offeredService
           from OfferedService offeredService
           join fetch offeredService.service service
           join fetch offeredService.specialist specialist
           join fetch specialist.location location
           where service = :service
             and (:locationId is null or location.id = :locationId)
             and (:minimumRating is null )
             and (:maximumPrice is null or offeredService.price <= :maximumPrice)""")
    List<OfferedService> findAllByServiceAndSpecialistLocationAndMinimumRatingAndMinumumPrice(Service service,
                                                                                              Long locationId,
                                                                                              Double minimumRating,
                                                                                              Double maximumPrice);
}
//           group by offeredService, service, specialist, location
//           having :minimumRating is null or avg(serviceRequest.rating) > :minimumRating""")