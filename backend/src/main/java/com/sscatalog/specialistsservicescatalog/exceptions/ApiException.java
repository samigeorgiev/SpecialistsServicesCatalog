package com.sscatalog.specialistsservicescatalog.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ApiException extends ResponseStatusException {

    public ApiException(String message) {
        super(HttpStatus.BAD_REQUEST, message);
    }

    public ApiException(HttpStatus httpStatus, String message) {
        super(httpStatus, message);
    }

    public ApiException(HttpStatus httpStatus, String message, Exception exception) {
        super(httpStatus, message, exception);
    }
}
