package com.sscatalog.specialistsservicescatalog.exceptions;

import org.springframework.http.HttpStatus;

public class ApiException extends RuntimeException {

    private HttpStatus status = HttpStatus.BAD_REQUEST;

    public ApiException(String message) {
        super(message);
    }

    public ApiException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }
}
