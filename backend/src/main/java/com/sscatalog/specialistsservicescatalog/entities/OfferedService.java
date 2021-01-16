package com.sscatalog.specialistsservicescatalog.entities;

import javax.persistence.*;

@Entity
@Table(name = "specialists_services")
public class OfferedService {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    @Column(name = "price")
    private double price;

    @Column(name = "is_prepaid")
    private boolean isPrepaid;

    @ManyToOne
    @JoinColumn(name = "specialist_id")
    private Specialist specialist;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private Service service;

    public OfferedService() {
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
