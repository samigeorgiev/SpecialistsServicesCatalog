package com.sscatalog.specialistsservicescatalog.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "specialists")
public class Specialist {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "specialist")
    private List<OfferedService> services;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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
}
