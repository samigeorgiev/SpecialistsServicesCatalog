package com.sscatalog.specialistsservicescatalog.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Objects;

@Entity
@Table(name = "users", indexes = { @Index(columnList = "facebook_id", unique = true) })
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "name")
    @NotNull
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "facebook_id")
    @NotNull
    private long facebookId;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Specialist specialist;

    protected User() {
    }

    public User(String name, String email, long facebookId) {
        this.name = name;
        this.email = email;
        this.facebookId = facebookId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        User user = (User)o;
        return facebookId == user.facebookId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(facebookId);
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public long getFacebookId() {
        return facebookId;
    }

    public void setFacebookId(long facebookId) {
        this.facebookId = facebookId;
    }

    public Specialist getSpecialist() {
        return specialist;
    }

    public void setSpecialist(Specialist specialist) {
        this.specialist = specialist;
    }
}
