package com.sscatalog.specialistsservicescatalog.utils;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;
import java.util.stream.Collectors;

public class HttpUtils {

    public static <T> T get(String url, Class<T> responseType) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                                         .uri(URI.create(url))
                                         .GET()
                                         .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        return new ObjectMapper().readValue(response.body(), responseType);
    }

    public static String buildQueryString(Map<String, String> queryParams) {
        return queryParams.entrySet()
                          .stream()
                          .map(entry -> String.format("%s=%s", entry.getKey(), entry.getValue()))
                          .collect(Collectors.joining("&", "?", ""));
    }
}
