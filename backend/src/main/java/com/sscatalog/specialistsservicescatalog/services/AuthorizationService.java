package com.sscatalog.specialistsservicescatalog.services;

import com.sscatalog.specialistsservicescatalog.config.properties.OAuth2FacebookProperties;
import com.sscatalog.specialistsservicescatalog.dtos.AuthorizationFacebookResponse;
import com.sscatalog.specialistsservicescatalog.dtos.FacebookAccessTokenResponse;
import com.sscatalog.specialistsservicescatalog.dtos.FacebookUserInfoResponse;
import com.sscatalog.specialistsservicescatalog.entities.User;
import com.sscatalog.specialistsservicescatalog.exceptions.ApiException;
import com.sscatalog.specialistsservicescatalog.repositories.UserRepository;
import com.sscatalog.specialistsservicescatalog.utils.OAuth2ParametersKeys;
import com.sscatalog.specialistsservicescatalog.utils.HttpUtils;
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

    private final OAuth2FacebookProperties oAuth2FacebookProperties;

    public AuthorizationService(JwtService jwtService,
                                UserRepository userRepository,
                                OAuth2FacebookProperties oAuth2FacebookProperties) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.oAuth2FacebookProperties = oAuth2FacebookProperties;
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
                                  .orElseGet(() -> userRepository.save(new User(userInfo.getName(), userInfo.getId())));

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
            put(OAuth2ParametersKeys.CLIENT_ID, oAuth2FacebookProperties.getClientId());
            put(OAuth2ParametersKeys.CLIENT_SECRET, oAuth2FacebookProperties.getClientSecret());
            put(OAuth2ParametersKeys.CODE, code);
            put(OAuth2ParametersKeys.REDIRECT_URI, redirectUri);
        }};
        return oAuth2FacebookProperties.getAccessTokenUrl() + HttpUtils.buildQueryString(queryParams);
    }

    private String buildFacebookUserInfoUrl(String accessToken) {
        Map<String, String> queryParams = new HashMap<>() {{
            put(OAuth2ParametersKeys.ACCESS_TOKEN, accessToken);
        }};
        return oAuth2FacebookProperties.getUserInfoUrl() + HttpUtils.buildQueryString(queryParams);
    }
}
