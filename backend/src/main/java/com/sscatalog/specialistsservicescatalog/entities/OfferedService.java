package com.sscatalog.specialistsservicescatalog.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "offered_services", indexes = {
        @Index(columnList = "specialist_id"),
        @Index(columnList = "service_id")
})
public class OfferedService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "price")
    @NotNull
    private double price;

    @Column(name = "is_prepaid")
    @NotNull
    private boolean isPrepaid;

    @ManyToOne
    @JoinColumn(name = "specialist_id")
    @NotNull
    private Specialist specialist;

    @ManyToOne
    @JoinColumn(name = "service_id")
    @NotNull
    private Service service;

    protected OfferedService() {
    }

    public OfferedService(double price, boolean isPrepaid) {
        this.price = price;
        this.isPrepaid = isPrepaid;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public boolean isPrepaid() {
        return isPrepaid;
    }

    public void setPrepaid(boolean prepaid) {
        isPrepaid = prepaid;
    }

    public Specialist getSpecialist() {
        return specialist;
    }

    public void setSpecialist(Specialist specialist) {
        this.specialist = specialist;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }
}
