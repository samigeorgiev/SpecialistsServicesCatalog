package com.sscatalog.specialistsservicescatalog.services;

import com.sscatalog.specialistsservicescatalog.dtos.AuthorizationFacebookResponse;
import com.sscatalog.specialistsservicescatalog.dtos.FacebookAccessTokenResponse;
import com.sscatalog.specialistsservicescatalog.dtos.FacebookUserInfoResponse;
import com.sscatalog.specialistsservicescatalog.entities.User;
import com.sscatalog.specialistsservicescatalog.exceptions.ApiException;
import com.sscatalog.specialistsservicescatalog.repositories.UserRepository;
import com.sscatalog.specialistsservicescatalog.utils.FacebookParametersKeys;
import com.sscatalog.specialistsservicescatalog.utils.HttpUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthorizationService {

    private final JwtService jwtService;

    private final UserRepository userRepository;

    @Value("${oauth2.facebook.access-token-url}")
    private String facebookAccessTokenUrl;

    @Value("${oauth2.facebook.user-info-url}")
    private String facebookUserInfoUrl;

    @Value("${oauth2.facebook.client-id}")
    private String facebookClientId;

    @Value("${oauth2.facebook.client-secret}")
    private String facebookClientSecret;

    public AuthorizationService(JwtService jwtService, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    public AuthorizationFacebookResponse authorizeWithFacebook(String code, String redirectUri) {
        FacebookAccessTokenResponse accessToken;
        FacebookUserInfoResponse userInfo;
        try {
            String accessTokenUrl = buildFacebookAccessTokenUrl(code, redirectUri);
            accessToken = HttpUtils.get(accessTokenUrl, FacebookAccessTokenResponse.class);
            String userInfoUrl = buildFacebookUserInfoUrl(accessToken.getAccessToken());
            userInfo = HttpUtils.get(userInfoUrl, FacebookUserInfoResponse.class);
        } catch (IOException | InterruptedException exception) {
            throw new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, "Authorization error", exception);
        }

        User user = userRepository.findByFacebookId(userInfo.getId())
                                  .orElseGet(() -> userRepository.save(new User(userInfo.getId())));

        String token;
        try {
            token = jwtService.generateToken(user.getId(), accessToken.getExpiresIn());
        } catch (UnsupportedEncodingException exception) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Generating token failed", exception);
        }

        return new AuthorizationFacebookResponse(token, accessToken.getExpiresIn());
    }

    private String buildFacebookAccessTokenUrl(String code, String redirectUri) {
        Map<String, String> queryParams = new HashMap<>() {{
            put(FacebookParametersKeys.CLIENT_ID, facebookClientId);
            put(FacebookParametersKeys.CLIENT_SECRET, facebookClientSecret);
            put(FacebookParametersKeys.CODE, code);
            put(FacebookParametersKeys.REDIRECT_URI, redirectUri);
        }};
        return facebookAccessTokenUrl + HttpUtils.buildQueryString(queryParams);
    }

    private String buildFacebookUserInfoUrl(String accessToken) {
        Map<String, String> queryParams = new HashMap<>() {{
            put(FacebookParametersKeys.ACCESS_TOKEN, accessToken);
        }};
        return facebookUserInfoUrl + HttpUtils.buildQueryString(queryParams);
    }
}
