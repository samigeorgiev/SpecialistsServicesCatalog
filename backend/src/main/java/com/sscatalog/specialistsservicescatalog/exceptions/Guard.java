package com.sscatalog.specialistsservicescatalog.exceptions;

import org.springframework.http.HttpStatus;

public class Guard {

    public static <T> void againstNull(T value, String message) {
        againstNull(value, HttpStatus.BAD_REQUEST, message);
    }

    public static <T> void againstNull(T value, HttpStatus status, String message) {
        if (value == null) {
            throw new ApiException(status, message);
        }
    }
}
