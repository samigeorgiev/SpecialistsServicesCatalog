package com.sscatalog.specialistsservicescatalog.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionHandlerAdvice {

    @ExceptionHandler({ ApiException.class })
    public ResponseEntity<ErrorResponse> handleApiException(ApiException exception) {
        return ResponseEntity.status(exception.getStatus())
                             .body(new ErrorResponse(exception.getMessage()));
    }

    @ExceptionHandler({ Exception.class })
    public ResponseEntity<ErrorResponse> handleAllExceptions(Exception exception) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body(new ErrorResponse(exception.getMessage()));
    }
}
