package com.sscatalog.specialistsservicescatalog.repositories;

import com.sscatalog.specialistsservicescatalog.entities.ServiceRequest;
import com.sscatalog.specialistsservicescatalog.entities.ServiceRequestStatus;
import com.sscatalog.specialistsservicescatalog.entities.Specialist;
import com.sscatalog.specialistsservicescatalog.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {

    @Query("""
           select serviceRequest
           from ServiceRequest serviceRequest
           join fetch serviceRequest.requestedService requestedService
           join fetch requestedService.specialist specialist
           where specialist = :specialist""")
    List<ServiceRequest> findAllBySpecialist(Specialist specialist);

    @Query("""
           select serviceRequest
           from ServiceRequest serviceRequest
           join fetch serviceRequest.requestedService requestedService
           join fetch requestedService.specialist specialist
           where specialist = :specialist and serviceRequest.status = :status""")
    List<ServiceRequest> findAllBySpecialistAndStatus(Specialist specialist, ServiceRequestStatus status);

    @Query("""
           select serviceRequest
           from ServiceRequest serviceRequest
           join fetch serviceRequest.requestor requestpr
           where requestpr = :requestor
               and (serviceRequest.status is null or serviceRequest.status = :status)
               and (serviceRequest.paid is null or serviceRequest.paid = :paid)""")
    List<ServiceRequest> findAllByRequestorAndStatusAndPaid(User requestor, ServiceRequestStatus status, Boolean paid);

    List<ServiceRequest> findAllByPayTimestampBeforeAndPaidTrue(LocalDateTime payTimestamp);
}
