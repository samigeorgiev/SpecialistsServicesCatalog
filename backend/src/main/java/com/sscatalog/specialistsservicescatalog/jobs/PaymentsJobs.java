package com.sscatalog.specialistsservicescatalog.jobs;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class PaymentsJobs {

    @Scheduled(cron = "0 0 0 ? * * ")
    public void specialistsPayouts() {
        System.out.println("Specialists payouts");
    }
}
