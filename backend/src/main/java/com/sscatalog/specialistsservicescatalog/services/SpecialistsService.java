package com.sscatalog.specialistsservicescatalog.services;

import com.sscatalog.specialistsservicescatalog.entities.Specialist;
import com.sscatalog.specialistsservicescatalog.entities.User;
import com.sscatalog.specialistsservicescatalog.repositories.SpecialistRepository;
import org.springframework.stereotype.Service;

@Service
public class SpecialistsService {

    private final SpecialistRepository specialistRepository;

    public SpecialistsService(SpecialistRepository specialistRepository) {
        this.specialistRepository = specialistRepository;
    }

    public void becomeSpecialist(User user) {
        Specialist specialist = new Specialist();
        specialist.setUser(user);

        specialistRepository.save(specialist);
    }
}
