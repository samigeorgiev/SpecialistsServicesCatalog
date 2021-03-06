package com.sscatalog.specialistsservicescatalog.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name = "services")
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "name")
    @NotNull
    private String name;

    @ManyToOne
    @JoinColumn(name = "tag_id")
    @NotNull
    private Tag tag;

    @OneToMany(mappedBy = "service")
    private List<OfferedService> offeredServices;

    protected Service() {
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
