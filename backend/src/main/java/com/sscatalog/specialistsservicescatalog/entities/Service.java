package com.sscatalog.specialistsservicescatalog.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "services")
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "tag_id")
    private Tag tag;

    @OneToMany(mappedBy = "service")
    private List<OfferedService> offeredServices;

    public Service() {
    }

    public Service(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Tag getTag() {
        return tag;
    }

    public void setTag(Tag tag) {
        this.tag = tag;
    }

    public List<OfferedService> getOfferedServices() {
        return offeredServices;
    }

    public void setOfferedServices(List<OfferedService> offeredServices) {
        this.offeredServices = offeredServices;
    }
}
