package com.sscatalog.specialistsservicescatalog.dtos;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

public class RateServiceRequestRequest {

    @Min(0)
    @Max(10)
    public int rating;

    public int getRating() {
        return rating;
    }
}
