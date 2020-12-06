package com.sscatalog.specialistsservicescatalog.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sscatalog.specialistsservicescatalog.entities.User;
import com.sscatalog.specialistsservicescatalog.exceptions.ApiException;
import com.sscatalog.specialistsservicescatalog.dtos.FacebookAccessTokenResponse;
import com.sscatalog.specialistsservicescatalog.dtos.FacebookUserInfoResponse;
import com.sscatalog.specialistsservicescatalog.repositories.UserRepository;
import com.sscatalog.specialistsservicescatalog.dtos.AuthenticationFacebookResponse;
import com.sscatalog.specialistsservicescatalog.utils.HttpUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthenticationService {

    private final JwtService jwtService;

    private final UserRepository userRepository;

    @Value("${authentication.facebook.access-token-url}")
    private String facebookAccessTokenUrl;

    @Value("${authentication.facebook.user-info-url}")
    private String facebookUserInfoUrl;

    @Value("${authentication.facebook.client-id}")
    private String facebookClientId;

    @Value("${authentication.facebook.client-secret}")
    private String facebookClientSecret;

    public AuthenticationService(JwtService jwtService, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    public AuthenticationFacebookResponse authenticateWithFacebook(String code, String redirectUri) {
        FacebookAccessTokenResponse accessToken = getFacebookAccessToken(code, redirectUri);
        FacebookUserInfoResponse userInfo = getFacebookUserInfo(accessToken.getAccessToken());
        User user = userRepository.findByFacebookId(userInfo.getId())
                                  .orElseGet(() -> userRepository.save(new User(userInfo.getId())));

        String token;
        try {
            token = jwtService.generateToken(user.getId(), accessToken.getExpiresIn());
        } catch (UnsupportedEncodingException e) {
            throw new ApiException("Generating token failed");
        }

        return new AuthenticationFacebookResponse(token, accessToken.getExpiresIn());
    }

    private FacebookAccessTokenResponse getFacebookAccessToken(String code, String redirectUri) {
        HttpClient client = HttpClient.newHttpClient();

        String accessTokenUrl = buildFacebookAccessTokenUrl(code, redirectUri);
        HttpRequest request = HttpRequest.newBuilder()
                                         .uri(URI.create(accessTokenUrl))
                                         .GET()
                                         .build();
        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            return new ObjectMapper().readValue(response.body(), FacebookAccessTokenResponse.class);
        } catch (IOException | InterruptedException e) {
            throw new ApiException(e.getMessage());
        }
    }

    private String buildFacebookAccessTokenUrl(String code, String redirectUri) {
        Map<String, String> queryParams = new HashMap<>() {{
            put("client_id", facebookClientId);
            put("client_secret", facebookClientSecret);
            put("code", code);
            put("redirect_uri", redirectUri);
        }};
        return facebookAccessTokenUrl + HttpUtils.buildQueryString(queryParams);
    }

    private FacebookUserInfoResponse getFacebookUserInfo(String accessToken) {
        HttpClient client = HttpClient.newHttpClient();

        String accessTokenUrl = buildFacebookUserInfoUrl(accessToken);
        HttpRequest request = HttpRequest.newBuilder()
                                         .uri(URI.create(accessTokenUrl))
                                         .GET()
                                         .build();
        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            return new ObjectMapper().readValue(response.body(), FacebookUserInfoResponse.class);
        } catch (IOException | InterruptedException e) {
            throw new ApiException(e.getMessage());
        }
    }

    private String buildFacebookUserInfoUrl(String accessToken) {
        Map<String, String> queryParams = new HashMap<>() {{
            put("access_token", accessToken);
        }};
        return facebookUserInfoUrl + HttpUtils.buildQueryString(queryParams);
    }
}
