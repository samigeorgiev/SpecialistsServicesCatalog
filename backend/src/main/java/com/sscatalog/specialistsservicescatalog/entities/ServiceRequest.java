package com.sscatalog.specialistsservicescatalog.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "service_requests")
public class ServiceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    @NotNull
    private ServiceRequestStatus status;

    @Column(name = "paid")
    @NotNull
    private boolean paid;

    @Column(name = "pay_timestamp")
    private LocalDateTime payTimestamp;

    @Column(name = "rating")
    private int rating;

    @Column(name = "comment")
    private String comment;

    @ManyToOne
    @JoinColumn(name = "requestor_id")
    @NotNull
    private User requestor;

    @ManyToOne
    @JoinColumn(name = "requested_service_id")
    @NotNull
    private OfferedService requestedService;

    protected ServiceRequest() {
    }

    public ServiceRequest(ServiceRequestStatus status, boolean paid, User requestor, OfferedService requestedService) {
        this.status = status;
        this.paid = paid;
        this.requestor = requestor;
        this.requestedService = requestedService;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public ServiceRequestStatus getStatus() {
        return status;
    }

    public void setStatus(ServiceRequestStatus status) {
        this.status = status;
    }

    public boolean isPaid() {
        return paid;
    }

    public void setPaid(boolean paid) {
        this.paid = paid;
    }

    public LocalDateTime getPayTimestamp() {
        return payTimestamp;
    }

    public void setPayTimestamp(LocalDateTime payTimestamp) {
        this.payTimestamp = payTimestamp;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public User getRequestor() {
        return requestor;
    }

    public void setRequestor(User requestor) {
        this.requestor = requestor;
    }

    public OfferedService getRequestedService() {
        return requestedService;
    }

    public void setRequestedService(OfferedService requestedService) {
        this.requestedService = requestedService;
    }
}
