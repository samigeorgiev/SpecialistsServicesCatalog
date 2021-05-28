package com.sscatalog.specialistsservicescatalog.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@ConfigurationProperties(prefix = "oauth2.facebook")
@ConstructorBinding
public class OAuth2FacebookProperties {

    private final String accessTokenUrl;

    private final String userInfoUrl;

    private final String userEmailUrl;

    private final String clientId;

    private final String clientSecret;

    public OAuth2FacebookProperties(String accessTokenUrl,
                                    String userInfoUrl,
                                    String userEmailUrl,
                                    String clientId,
                                    String clientSecret) {
        this.accessTokenUrl = accessTokenUrl;
        this.userInfoUrl = userInfoUrl;
        this.userEmailUrl = userEmailUrl;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    public String getAccessTokenUrl() {
        return accessTokenUrl;
    }

    public String getUserInfoUrl() {
        return userInfoUrl;
    }

    public String getUserEmailUrl() {
        return userEmailUrl;
    }

    public String getClientId() {
        return clientId;
    }

    public String getClientSecret() {
        return clientSecret;
    }
}
