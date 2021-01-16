package com.sscatalog.specialistsservicescatalog.dtos;

public class IsSpecialistResponse {

    private final boolean isSpecialist;

    public IsSpecialistResponse(boolean isSpecialist) {
        this.isSpecialist = isSpecialist;
    }

    public boolean isSpecialist() {
        return isSpecialist;
    }
}
