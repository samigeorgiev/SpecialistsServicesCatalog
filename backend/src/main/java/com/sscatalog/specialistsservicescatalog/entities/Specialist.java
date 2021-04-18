package com.sscatalog.specialistsservicescatalog.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name = "specialists", indexes = { @Index(columnList = "user_id", unique = true) })
public class Specialist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "stripe_account_id")
    @NotNull
    private String stripeAccountId;

    @OneToOne
    @JoinColumn(name = "user_id")
    @NotNull
    private User user;

    @OneToMany(mappedBy = "specialist", cascade = CascadeType.ALL)
    private List<OfferedService> services;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    protected Specialist() {}

    public Specialist(String stripeAccountId) {
        this.stripeAccountId = stripeAccountId;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getStripeAccountId() {
        return stripeAccountId;
    }

    public void setStripeAccountId(String stripeAccountId) {
        this.stripeAccountId = stripeAccountId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<OfferedService> getServices() {
        return services;
    }

    public void setServices(List<OfferedService> services) {
        this.services = services;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
}
