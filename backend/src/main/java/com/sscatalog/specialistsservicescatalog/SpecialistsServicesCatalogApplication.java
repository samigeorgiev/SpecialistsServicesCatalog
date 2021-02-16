package com.sscatalog.specialistsservicescatalog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@ConfigurationPropertiesScan("com.sscatalog.specialistsservicescatalog.config.properties")
public class SpecialistsServicesCatalogApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpecialistsServicesCatalogApplication.class, args);
    }
}
