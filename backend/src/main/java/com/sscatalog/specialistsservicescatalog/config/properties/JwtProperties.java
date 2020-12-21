package com.sscatalog.specialistsservicescatalog.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@ConfigurationProperties("jwt")
@ConstructorBinding
public class JwtProperties {

    private final String secret;

    public JwtProperties(String secret) {
        this.secret = secret;
    }

    public String getSecret() {
        return secret;
    }
}
