package com.sscatalog.specialistsservicescatalog.utils;

import java.util.Map;
import java.util.stream.Collectors;

public class HttpUtils {

    public static String buildQueryString(Map<String, String> queryParams) {
        return queryParams.entrySet()
                          .stream()
                          .map(entry -> entry.getKey() + "=" + entry.getValue())
                          .collect(Collectors.joining("&", "?", ""));
    }
}
