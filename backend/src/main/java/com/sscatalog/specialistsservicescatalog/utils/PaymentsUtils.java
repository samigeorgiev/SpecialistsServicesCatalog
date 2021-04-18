package com.sscatalog.specialistsservicescatalog.utils;

public class PaymentsUtils {

    public static long convertToStripePrice(double price) {
        return (long)(price * 100);
    }
}
