package com.sscatalog.specialistsservicescatalog.dtos;

import com.sscatalog.specialistsservicescatalog.entities.ServiceRequestStatus;

public class ServiceRequestDto {

    private final long id;

    private final ServiceRequestStatus status;

    private final boolean paid;

    private final int rating;

    private final String comment;

    private final String requestorName;

    private final String requestorEmail;

    private final OfferedServiceDto requestedService;

    public ServiceRequestDto(long id,
                             ServiceRequestStatus status,
                             boolean paid,
                             int rating,
                             String comment,
                             String requestorName,
                             String requestorEmail,
                             OfferedServiceDto requestedService) {
        this.id = id;
        this.status = status;
        this.paid = paid;
        this.rating = rating;
        this.comment = comment;
        this.requestorName = requestorName;
        this.requestorEmail = requestorEmail;
        this.requestedService = requestedService;
    }

    public long getId() {
        return id;
    }

    public ServiceRequestStatus getStatus() {
        return status;
    }

    public boolean isPaid() {
        return paid;
    }

    public int getRating() {
        return rating;
    }

    public String getComment() {
        return comment;
    }

    public String getRequestorName() {
        return requestorName;
    }

    public String getRequestorEmail() {
        return requestorEmail;
    }

    public OfferedServiceDto getRequestedService() {
        return requestedService;
    }
}
