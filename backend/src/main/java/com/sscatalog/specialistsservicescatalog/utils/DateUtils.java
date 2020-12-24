package com.sscatalog.specialistsservicescatalog.utils;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

public class DateUtils {

    public static Date dateFromLocalDateTime(LocalDateTime dateTime) {
        Instant instant = dateTime.atZone(ZoneId.systemDefault())
                                  .toInstant();
        return Date.from(instant);
    }
}
